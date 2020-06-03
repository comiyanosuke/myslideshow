'use strict';

{
  const images = [
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
    'img/pic07.png',
  ];
 
  let currentIndex = 0; //現在表示しているメインイメージ
  
  //メインイメージの表示
  const mainImage = document.getElementById('main');
  mainImage.src = images[currentIndex];

  //サムネイルの表示
  images.forEach((image, index) => {
    const img = document.createElement('img');  //img要素を作成
    img.src = image;

    const li = document.createElement('li');
        if (index === currentIndex) {
        li.classList.add('current');
        }
        li.addEventListener('click', () => {    //クリックイベントを設置
        mainImage.src = image;  //クリックされた時、この画像をメインに表示
        const thumbnails = document.querySelectorAll('.thumbnails > li');
        thumbnails[currentIndex].classList.remove('current'); //前のcurrent画像から一度currentを外す。
        currentIndex = index; //クリックした画像のインデックスに変更
        thumbnails[currentIndex].classList.add('current');  //クリックされたサムネイルにクラスをつける
        });

        li.appendChild(img);  //jsで生成されたimg要素をli要素の下に入れる
        document.querySelector('.thumbnails').appendChild(li);  //.thumbnailクラスの下に生成されたli要素を入れる
  });

  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    let target = currentIndex + 1;  //targtは次に表示される画像のインデックス
    if (target === images.length) {
      target = 0;
    }
    document.querySelectorAll('.thumbnails > li')[target].click();
  });

  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    let target = currentIndex - 1;
    if (target < 0) {
      target = images.length - 1;
    }
    document.querySelectorAll('.thumbnails > li')[target].click();
  });

  let timeoutId;

  function playSlideshow() {
    timeoutId = setTimeout(() => {
      next.click();
      playSlideshow();
    }, 1000);
  }

  let isPlaying = false;

  const play = document.getElementById('play');
  play.addEventListener('click', () => {
    if (isPlaying === false) {
      playSlideshow();
      play.textContent = 'Pause';
    } else {
      clearTimeout(timeoutId);
      play.textContent = 'Play';
    }
    isPlaying = !isPlaying;
  });
}