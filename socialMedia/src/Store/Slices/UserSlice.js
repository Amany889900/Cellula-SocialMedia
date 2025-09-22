import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
    const chat = JSON.parse(localStorage.getItem("chat"))




let initialState = {
  followers: [],
  following: [],
  posts: [],
  notifications: [],
  user:{},
  promptResponse:"",
  chat:chat||[],
  loading: false,
  error: null,
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (user_id, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/get-user_data", {
        params: { user_id },
      });
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error fetching user");
    }
  }
);


export const getFollowers = createAsyncThunk(
  "user/getUserFollowers",
  async (user_id, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/get-followers", {
        params: { user_id },
      });
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error fetching followers");
    }
  }
);

export const getFollowing = createAsyncThunk(
  "user/getUserFollowings",
  async (user_id, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/get-followings", {
        params: { user_id },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error fetching followings");
    }
  }
);

export const getPosts = createAsyncThunk(
  "user/getUserPosts",
  async (user_id, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/get-user-posts", {
        params: { user_id },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error fetching posts");
    }
  }
);

export const getNotifications = createAsyncThunk(
  "user/getUserNotifications",
  async (user_id, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/get-notifications", {
        params: { user_id },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error fetching notifications");
    }
  }
);

export const follow = createAsyncThunk(
  "user/follow",
  async ({ sender_id, receiver_id }, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/follow",
        null, // no body
        {
          params: { sender_id, receiver_id },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error following user");
    }
  }
);

export const unfollow = createAsyncThunk(
  "user/unfollow",
  async ({ sender_id, receiver_id }, thunkAPI) => {
    try {
      const response = await axios.delete("http://127.0.0.1:8000/unfollow", {
        params: { sender_id, receiver_id },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error unfollowing user");
    }
  }
);

export const sendPrompt = createAsyncThunk(
  "user/sendPrompt",
  async ({user_id,content}, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/send-prompt",
        null, // no body
        {
          params:{user_id,content},
        }
      );
      return response.data.response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error sending prompt");
    }
  }
);



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
       // user
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload[0]; // get the user object
        state.user.userName = "@" + action.payload[0].name.toLowerCase().replace(" ",".")
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // followers
      .addCase(getFollowers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.followers = action.payload;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // following
      .addCase(getFollowing.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.following = action.payload;
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // posts
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // follow
      .addCase(follow.pending, (state) => {
        state.loading = true;
      })
      .addCase(follow.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(follow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

            // unfollow
      .addCase(unfollow.pending, (state) => {
        state.loading = true;
      })
      .addCase(unfollow.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(unfollow.rejected, (state, action) => {
        state.loading = false;
      })

                  // chat
      .addCase(sendPrompt.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendPrompt.fulfilled, (state, action) => {
        state.loading = false;
        state.promptResponse = action.payload;
      })
      .addCase(sendPrompt.rejected, (state, action) => {
        state.loading = false;
      })

      // notifications
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
