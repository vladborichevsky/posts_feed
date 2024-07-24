<template>
	<div class="slider">
    <button 
      @click="changeSlidePrev()" 
      class="slide_prev" 
      ref="slidePrev">
        &#9668;
    </button>

    <button 
      @click="changeSlideNext()"
      class="slide_next"
      ref="slideNext">
        &#9658;
    </button>

		<img  
      v-for="(slide, index) in slides" 
      :key="index" 
      v-bind:src="slide"
      class="slider_item" 
      alt="Изображение 1" 
      ref="slides">

		<div class="selectors_slider_container">
			<div 
        v-for="(slide, index) in slides" 
        :key="index"
        @click="activateSelectorsSlider(index)"
        class="selector_slider" 
        ref="selectorsSlider"/>
		</div>
	</div>
</template>

<script>
  // объявяем переменную, в которую в хуке mounted поместим setInterval с функцией переключения слайдов, а в хуке beforeUnmount удалим этот setInterval через команду clearInterval
  let interval;

	export default {
		data() {
      return {
				slides: [  // массив со всеми картинками для слайдеров
				  "/img/sliders/img_1.jpg",	 
					"/img/sliders/img_2.jpg",
          "/img/sliders/img_3.jpg", 
					"/img/sliders/img_4.jpg",
					"/img/sliders/img_5.jpg",
          "/img/sliders/img_6.jpg"
          
				],
        currentIndex: 0, // порядковый счётчик слайдеров
      } 
    },

    methods: {
      // функция, которая добавляет "активность" релевантной кнопочке навигации
      changeActiveSelectorBtn(i) {
        this.$refs.selectorsSlider.forEach(item => {
          item.style.backgroundColor = '#aaa7a7'
        })
        this.$refs.selectorsSlider[i].style.backgroundColor = '#ffff'
      },

      // самая главная функция, именно она отвечает за то, чтобы один из слайдеров был "активным". В ней используем аргументы по умолчанию. Т.е. если её вызвать без аргументов (как мы это сделали выше), то отобразиться первый слайдер
      showNewSlide(newIndex = 0) {
        // убираем "активность" со всех слайдов
        this.$refs.slides.forEach(item => item.style.opacity = 0)
        // добавляем "активность" новому слайдеру
        this.$refs.slides[newIndex].style.opacity = 1;
        // запускаем функцию, которая добавляет "активность" релевантной кнопочке навигации
        this.changeActiveSelectorBtn(newIndex)
      },

      // функция, которая изменяет счётчик слайдеров (подкапотный) currentIndex в сторону увеличения
      changeSlideNext() {
        // это проверка, что если у нас сейчас отображается последний по порядку слайдер, то счётким сайдеров переключается на самый первый слайдер
        if (this.currentIndex === this.slides.length - 1) {
          this.currentIndex = 0
        } else {
          this.currentIndex += 1
        }
        // вызываем главную функцию, которая отвечает за показ слайдов уже с новым значением currentIndex
        this.showNewSlide(this.currentIndex)
      },

      // функция, которая изменяет счётчик слайдеров (подкапотный) currentIndex в сторону уменьшения
      changeSlidePrev() {
        // это проверка, что если у нас сейчас отображается первый по порядку слайдер, то счётким сайдеров переключается на последний слайдер
        if (this.currentIndex == 0) {
          this.currentIndex = (this.slides.length - 1)
        } else {
          this.currentIndex -= 1
        }
        // вызываем главную функцию, которая отвечает за показ слайдов уже с новым значением currentIndex
        this.showNewSlide(this.currentIndex)
      },
      
      // обработчик события на кнопочки навигации , который переключает слайды
      activateSelectorsSlider(index) {
        // это нужная строчка. Мы не можем просто ниже в функию showNewSlide передать в качестве аргумента I. Нам нужно изменить главный подкапотный счётчик currentIndex. 
        this.currentIndex = index
        this.showNewSlide(index)
      }
    },

		mounted() {
      // запускаем функцию, которая сделает активным первый слайд. В ней используются аргументы по умолчанию, поэтому если её вызвать без аргументов, то отобразится первый слайд.
      this.showNewSlide()

      // Запускаем функцию переключения слайдеров через сетИнтервал каждые 4 секунды
      interval = setInterval( this.changeSlideNext, 4000 );

      // вешаем 3 обработчика событий, чтобы если пользователь сам начал переключать слайдеры, то сетТаймаут выключался
      document.querySelector('.slide_prev').addEventListener('click', () => clearInterval(interval) )
      document.querySelector('.slide_next').addEventListener('click', () => clearInterval(interval) )
      document.querySelectorAll('.selector_slider').forEach( item => {
        item.addEventListener('click', () => clearInterval(interval) )
      }) 
    },

    beforeUnmount() {
      // перед удалением экземпляра компонента очищаем функцию setInterval
      clearInterval(interval)
    }
  }
</script>

<style scoped>
  .slider {
    margin: 0 auto;
    position: relative;
    width: 1100px;
    height: 220px;
    overflow: hidden;
    margin-bottom: 30px;
    margin-top: 30px;
  }

  .slider_item {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 1s;
    z-index: -1;
    object-fit: cover; 
  }

  .selectors_slider_container {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    display: flex;
    justify-content: space-between;
  }

  .selector_slider {
    box-shadow:  4px 6px 20px rgba(0,0,0,1);
    width: 30px;
    height: 7px;
    margin: 0 5px;
    background-color: var(--selector-slider-color);
    cursor: pointer;
  }

  .slide_prev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    font-weight: 900;
    font-size: 30px;
    border: none;
    background-color: inherit;
    color: var(--white-color);
    opacity: .4;
    margin: 0 10px;
    cursor: pointer;
  }

  .slide_next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    font-weight: 900;
    font-size: 30px;
    border: none;
    background-color: inherit;
    color: var(--white-color);
    opacity: .4;
    margin: 0 10px;
    cursor: pointer;
  }

  .count_slider {
    font-weight: 900;
    font-size: 30px;
    margin: 0 10px;
  }
</style>