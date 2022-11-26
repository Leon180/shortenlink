const copyButton = document.querySelector('#copy-button')
const linkText = document.querySelector('#link')
const copySuccess = document.querySelector('.copy-success')

copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(linkText.textContent)
    .then(() => {
      copySuccess.classList.remove('hide')
    })
})