const githubImage = document.querySelector('.github img');

const changeGithubImage = (backgroundColor) => {
  const red = parseInt(backgroundColor.substring(1, 3), 16);
  const green = parseInt(backgroundColor.substring(3, 5), 16);
  const blue = parseInt(backgroundColor.substring(5, 7), 16);

  let imgURL;
  if (red >= 160 && green >= 160 && blue >= 160) {
    imgURL = 'img/GitHub-Mark-120px-plus.png';
  } else {
    imgURL = 'img/GitHub-Mark-Light-120px-plus.png';
  }
  githubImage.setAttribute('src', imgURL);
};

export default changeGithubImage;
