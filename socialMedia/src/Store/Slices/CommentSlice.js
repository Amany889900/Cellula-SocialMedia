import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";





let initialState = {
  allPostCommentsWithUserData:[],
  userLikedComments:[],
  loading: false,
  error: null,
};




export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({user_id,post_id,content},thunkAPI) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/create-comment",null,{
        params:{
            user_id,
            post_id,
            content
        }
      });
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error commenting on post post");
    }
  }
);

export const getAllPostCommentsWithUserData = createAsyncThunk(
  "comment/getAllPostCommentsWithUserData",
  async (post_id,thunkAPI) => {
    try {
      const response= await axios.get("http://127.0.0.1:8000/get-post-comments",{
        params:{post_id}
      });
      const comments = response.data;

      // collect unique user_ids
      const userIds = [...new Set(comments.map((p) => p.user_id))];

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
      return comments.map((comment) => ({
        ...comment,
        user: usersMap[comment.user_id],
      }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error fetching comments");
    }
  }
);

export const likeComment = createAsyncThunk(
  "comment/likeComment",
  async ({user_id,comment_id,comment_user_id,post_id},thunkAPI) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/like-comment",null,{
        params:{
            user_id,
            comment_id,
            comment_user_id,
            post_id
        }
      });
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error liking comment");
    }
  }
);

export const deleteCommentLike = createAsyncThunk(
  "comment/deleteCommentLike",
  async ({user_id,comment_id,comment_user_id,post_id},thunkAPI) => {
    try {
      const response = await axios.delete("http://127.0.0.1:8000/delete-comment-like",{
        params:{
            user_id,
            comment_id,
            comment_user_id,
            post_id
        }
      });
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error disliking comment");
    }
  }
);




const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
       // create comment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // allPostComments
            .addCase(getAllPostCommentsWithUserData.pending, (state) => {
              state.loading = true;
            })
            .addCase(getAllPostCommentsWithUserData.fulfilled, (state, action) => {
              state.loading = false;
              state.allPostCommentsWithUserData = action.payload;
            })
            .addCase(getAllPostCommentsWithUserData.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })

        // likeComment
              .addCase(likeComment.pending, (state,action) => {
                state.loading = true;
                const {comment_id} = action.meta.arg;
                const comment =state.allPostCommentsWithUserData.find(c=>c.id === comment_id);
                comment.likes_count = (comment.likes_count || 0)  + 1;
                if(!state.userLikedComments.find(c=>c.id === comment_id)){
                    state.userLikedComments.push(comment);
                }
              })
              .addCase(likeComment.fulfilled, (state, action) => {
                state.loading = false;
                const {comment_id} = action.meta.arg;
                const comment =state.allPostCommentsWithUserData.find(c=>c.id === comment_id);
                state.userLikedComments.push(comment);
              })
              .addCase(likeComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                const {comment_id} = action.meta.arg;
                const comment =state.allPostCommentsWithUserData.find(c=>c.id === comment_id);
                comment.likes_count = (comment.likes_count || 0) - 1;
                state.userLikedComments = state.userLikedComments.filter(c=>c.id !== comment_id);
              })
        
              //deleteCommentLike
              .addCase(deleteCommentLike.pending, (state,action) => {
                state.loading = true;
                const {comment_id} = action.meta.arg;
                const comment =state.allPostCommentsWithUserData.find(c=>c.id === comment_id);
                comment.likes_count = (comment.likes_count || 0) - 1;
                state.userLikedComments = state.userLikedComments.filter(c=>c.id !== comment_id);
              })
              .addCase(deleteCommentLike.fulfilled, (state, action) => {
                state.loading = false;
                const {comment_id} = action.meta.arg;
                const comment =state.allPostCommentsWithUserData.find(c=>c.id === comment_id);
                state.userLikedComments = state.userLikedComments.filter(c=>c.id !== comment_id);
              })
              .addCase(deleteCommentLike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                const {comment_id} = action.meta.arg;
                const comment =state.allPostCommentsWithUserData.find(c=>c.id === comment_id);
                comment.likes_count = (comment.likes_count || 0) + 1;
                state.userLikedComments.push(comment);
                
        
              })
      

        
  },
});


export default commentSlice.reducer;