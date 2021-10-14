// import axios from 'axios';

// const count = {
//   name: 'count',
//   state: {
//     count: 0,
//     list: [],
//   },
//   reducers: {
//     increment(state, payload) {
//       return { ...state, count: state.count + payload };
//     },
//     updateList(state, payload) {
//       return {
//         ...state,
//         list: payload,
//       };
//     },
//   },
//   effects: (dispatch) => ({
//     async test(payload) {
//       const { data } = await axios.get(
//         `https://jsonplaceholder.typicode.com/posts/${payload}`
//       );

//       dispatch.count.updateList(data);
//     },
//   }),
// };

// export default count;
