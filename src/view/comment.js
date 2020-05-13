export const eachComment = (objComment) => {
  const comment = document.createElement('div');
  comment.innerHTML = `
    <p>${objComment.name}</p>
    <p>${objComment.comment}</p>
    <p>${objComment.time}</p>
  `;
};
