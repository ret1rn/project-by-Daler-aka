/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

"use strict";

const movieDB = {
  movies: [
    "Логан",
    "Лига справедливости",
    "Ла-ла лэнд",
    "Одержимость",
    "Скотт Пилигрим против...",
  ],
};

const reklama = document.querySelectorAll(".promo__adv img");
const bgColor = document.querySelector(".promo__bg");
const ul = document.querySelector(".promo__interactive-list")
const typesFilm = document.querySelectorAll(".promo__menu-item")
const form = document.querySelector(".add")

typesFilm.forEach(item => {
  item.onclick = () => {
    typesFilm.forEach(el => el.classList.remove("promo__menu-item_active"))
    item.classList.add("promo__menu-item_active")
  }
})

reklama.forEach((element) => {
  element.remove();
});

bgColor.style.backgroundImage = "url('./img/bg.jpg')"
bgColor.firstElementChild.innerHTML = "Драма";



function reload(arr, place) {
  place.innerHTML = ""
  for (let i = 0; i < arr.length; i++) {
    let li = document.createElement("li"),
      del = document.createElement("div")

    li.innerHTML = `${i + 1}. ${arr[i]}`

    li.classList.add("promo__interactive-item")
    del.classList.add("delete")

    ul.append(li)
    li.append(del)

    del.onclick = () => {
      movieDB.movies = movieDB.movies.filter(el => el !== arr[i])
      reload(movieDB.movies, ul)
    }
  }
}

reload(movieDB.movies, ul)

form.onsubmit = (event) => {
  event.preventDefault()

  let inp = document.querySelector(".adding__input")

  if (inp.value.length !== 0 && !movieDB.movies.includes(inp.value)) {
    movieDB.movies.push(inp.value)
  } else if (movieDB.movies.includes(inp.value)) {
    alert("Этот фильм уже есть в списке")
  } else {
    alert("Заполните input!")
  }

  reload(movieDB.movies, ul)
}

// promo__menu-item_active