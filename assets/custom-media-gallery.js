/*
  Variant Images Input Component
*/
class VariantImagesInput extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input')

    // Get the checked value when the page first loaded and select the
    // first image of the selected color
    if (this.querySelector('input:checked')) {
      this.active_input = this.querySelector('input:checked')
      this.active_input_value = this.active_input.value
      this.initializeFirstImageInMediaGallery()
    }

    // this.input.addEventListener('input', this.changeGallery.bind(this))
  }

  initializeFirstImageInMediaGallery(){
    const media_gallery = document.querySelector('media-gallery');

    const galleries = media_gallery.querySelectorAll('slider-component')

    this.cloneGalleries(galleries, media_gallery)
  }

  cloneGalleries(galleries, parent){
    galleries.forEach(gallery => {
      var clone_gallery = gallery.cloneNode(true)
      clone_gallery.style.display = 'none'
      clone_gallery.id = ''
      clone_gallery.setAttribute("cloned", "")
      parent.appendChild(clone_gallery)

      // Removing every li in the gallery slider
      gallery.querySelectorAll('li').forEach(element => {
        element.remove()
      });

      // Selecting the target images from the cloned Galleries
      this.getTheSelectedImages(gallery, clone_gallery)
    });
  }

  getTheSelectedImages(original_gallery, clone_gallery){
    const items = clone_gallery.querySelectorAll('li')
    items.forEach(item => {
      var option_value = item.getAttribute('data-variant-title')
      if (option_value == this.active_input_value ) {
        var new_item = item.cloneNode(true)
        new_item.style.visibility = "visible"
        original_gallery.querySelector('ul').appendChild(new_item)
      }
    });

    if (original_gallery.classList.contains('gallery-slider')) {
      original_gallery.querySelector('ul li').classList.add('is-active')
    }
  }

}

customElements.define('variant-images-input', VariantImagesInput);

// Changing the gallery images after updating the variants
// This function has been called in global.js at line 997
window.changeGallery = function (currentVariant){
  const media_gallery = document.querySelector('media-gallery')
  const option_position = media_gallery.getAttribute('data-change-gallery-option-position')
  
  const current_variant_options = currentVariant.options
  
  current_variant_options.forEach((option, index) => {
    if (index == option_position ) {
      const current_variant_option_value = option
      getImagesFromClonedGallery(current_variant_option_value)
    }
  });
}

function getImagesFromClonedGallery(targetOption){
  const media_gallery = document.querySelector('media-gallery')
  const original_galleries = media_gallery.querySelectorAll(`slider-component:not([cloned])`)
  const cloned_galleries = media_gallery.querySelectorAll(`slider-component[cloned]`)

  original_galleries.forEach((original_gallery, index) => {
    // Removing every li in the gallery slider
    original_gallery.querySelectorAll('li').forEach(element => {
      element.remove()
    });

    var cloned_gallery = cloned_galleries[index]
    const items = cloned_gallery.querySelectorAll('li')
    items.forEach(item => {
      var option_value = item.getAttribute('data-variant-title')
      if (option_value == targetOption ) {
        var new_item = item.cloneNode(true)
        new_item.style.visibility = "visible"
        new_item.style.opacity = "1"
        original_gallery.querySelector('ul').appendChild(new_item)
      }
    });

    if (original_gallery.classList.contains('gallery-slider')) {
      original_gallery.querySelector('ul li').classList.add('is-active')
    }else if (original_gallery.classList.contains('thumbnail-slider')){
      // original_gallery.querySelector('.thumbnail-list li .thumbnail').setAttribute('aria-current', 'true')
    }

  })
  // Initializing the slider
  initializeSliders()

  document.querySelector('.thumbnail-list li .thumbnail').click()
}
window.onload = function() {
  initializeSliders()
};

function initializeSliders(){
  const media_gallery = document.querySelector('media-gallery')
  media_gallery.appendListeners()
  const original_galleries = media_gallery.querySelectorAll(`slider-component:not([cloned])`)
  original_galleries.forEach(original_gallery => {
    original_gallery.resetPages()
  })
}