import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createComment } from "./CommentSlice";






let initialState = {
  allPostsWithUserData:[],
  userSharedPosts:[],
  userLikedPosts:[],
  loading: false,
  error: null,
};


export const getAllPostsWithUserData = createAsyncThunk(
  "post/getAllPostsWithUserData",
  async (thunkAPI) => {
    try {
      const response= await axios.get("http://127.0.0.1:8000/get-all-posts");
      const posts = response.data;

      // collect unique user_ids
      const userIds = [...new Set(posts.map((p) => p.user_id))];

      // fetch each user once
      const usersResponse = await Promise.all(
        userIds.map((id) =>
          axios.get("http://127.0.0.1:8000/get-user_data", {
            params: { user_id: id },
          })
        )
      );

      const usersMap = {};
      usersResponse.forEach((res) => {
        const user = res.data[0]; // your API wraps it in array
        usersMap[user.id] = user;
      });

      // merge user into post
      return posts.map((post) => ({
        ...post,
        user: usersMap[post.user_id],
      }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error fetching posts");
    }
  }
);

export const getUserSharedPosts = createAsyncThunk(
  "post/getUserSharedPosts",
  async (user_id,thunkAPI) => {
    try {
      const response= await axios.get("http://127.0.0.1:8000/get-user-shared-posts",{
        params:user_id
      });
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error fetching user shared posts");
    }
  }
);

export const sharePost = createAsyncThunk(
  "post/sharePost",
  async ({user_id,post_id},thunkAPI) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/share-post",null,{
        params:{
            user_id,
            post_id
        }
      });
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error sharing post");
    }
  }
);

export const likePost = createAsyncThunk(
  "post/likePost",
  async ({user_id,post_id},thunkAPI) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/like-post",null,{
        params:{
            user_id,
            post_id
        }
      });
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error liking post");
    }
  }
);

export const deletePostShare = createAsyncThunk(
  "post/deletePostShare",
  async ({user_id,post_id},thunkAPI) => {
    try {
      const response = await axios.delete("http://127.0.0.1:8000/delete-post-share",{
        params:{
            user_id,
            post_id
        }
      });
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error unsharing post");
    }
  }
);

export const deletePostLike = createAsyncThunk(
  "post/deletePostLike",
  async ({user_id,post_id},thunkAPI) => {
    try {
      const response = await axios.delete("http://127.0.0.1:8000/delete-post-like",{
        params:{
            user_id,
            post_id
        }
      });
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error disliking post");
    }
  }
);





const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
       // allPosts
      .addCase(getAllPostsWithUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPostsWithUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.allPostsWithUserData = action.payload;
      })
      .addCase(getAllPostsWithUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

        // userSharedPosts
      .addCase(getUserSharedPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserSharedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userSharedPosts = action.payload;
      })
      .addCase(getUserSharedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

            // createComment optimistic update
      .addCase(createComment.pending, (state, action) => {
        state.loading = true;
        const { post_id } = action.meta.arg;
        const post = state.allPostsWithUserData.find(p => p.id === post_id);
        if (post) {
          post.comments_count = (post.comments_count || 0) + 1; // optimistic increment
        }
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        const { post_id } = action.meta.arg;
        const post = state.allPostsWithUserData.find(p => p.id === post_id);
        if (post) {
          post.comments_count = (post.comments_count || 0) - 1; // rollback on error
        }
      })


       // sharePost
      .addCase(sharePost.pending, (state,action) => {
        state.loading = true;
        const {post_id} = action.meta.arg;
        const post =state.allPostsWithUserData.find(p=>p.id === post_id);
        post.shares_count = (post.shares_count || 0)  + 1;
        if(!state.userSharedPosts.find(s=>s.id === post_id)){
            state.userSharedPosts.push(post);
        }
      })
      .addCase(sharePost.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sharePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        const {post_id} = action.meta.arg;
        const post =state.allPostsWithUserData.find(p=>p.id === post_id);
        post.shares_count = (post.shares_count || 0) - 1;
        state.userSharedPosts = state.userSharedPosts.filter(s=>s.id === !post_id);

      })

      // likePost
      .addCase(likePost.pending, (state,action) => {
        state.loading = true;
        const {post_id} = action.meta.arg;
        const post =state.allPostsWithUserData.find(p=>p.id === post_id);
        post.likes_count = (post.likes_count || 0)  + 1;
        if(!state.userLikedPosts.find(s=>s.id === post_id)){
            state.userLikedPosts.push(post);
        }
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        const {post_id} = action.meta.arg;
        const post =state.allPostsWithUserData.find(p=>p.id === post_id);
        state.userLikedPosts.push(post);
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        const {post_id} = action.meta.arg;
        const post =state.allPostsWithUserData.find(p=>p.id === post_id);
        post.likes_count = (post.likes_count || 0) - 1;
        state.userLikedPosts = state.userLikedPosts.filter(s=>s.id === !post_id);
      })

      //deletePostLike
      .addCase(deletePostLike.pending, (state,action) => {
        state.loading = true;
        const {post_id} = action.meta.arg;
        const post =state.allPostsWithUserData.find(p=>p.id === post_id);
        post.likes_count = (post.likes_count || 0)  - 1;
        state.userLikedPosts = state.userLikedPosts.filter(s=>s.id === !post_id);
      })
      .addCase(deletePostLike.fulfilled, (state, action) => {
        state.loading = false;
        const {post_id} = action.meta.arg;
        const post =state.allPostsWithUserData.find(p=>p.id === post_id);
        state.userLikedPosts = state.userLikedPosts.filter(s=>s.id === !post_id);
      })
      .addCase(deletePostLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        const {post_id} = action.meta.arg;
        const post =state.allPostsWithUserData.find(p=>p.id === post_id);
        post.likes_count = (post.likes_count || 0) - 1;
        state.userLikedPosts.push(post);
        

      })

        // deletePostShare
      .addCase(deletePostShare.pending, (state,action) => {
        state.loading = true;
        const {post_id} = action.meta.arg;
        const post =state.allPostsWithUserData.find(p=>p.id === post_id);
        post.shares_count = post.shares_count  - 1;
        state.userSharedPosts=state.userSharedPosts.filter(s=>s.id === !post_id);

      })
      .addCase(deletePostShare.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deletePostShare.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        const {post_id} = action.meta.arg;
        const post =state.allPostsWithUserData.find(p=>p.id === post_id);
        post.shares_count = post.shares_count  + 1;
        state.userSharedPosts.push(post);

      })
   
  },
});


export default postSlice.reducer;