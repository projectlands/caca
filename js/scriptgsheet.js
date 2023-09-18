const url = "https://script.google.com/macros/s/AKfycbxZLKkOAio18qbU9V9-Du3AT5ELmfv0xBjsFCUjDMfTULOjhoo0MUM28FMTtwrLeMSy/exec";

fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data.GoogleSheetData[0]);
  })
  .catch(error => {
    console.error("Error:", error);
  });



// const scriptURL = 'https://script.google.com/macros/s/AKfycbxZLKkOAio18qbU9V9-Du3AT5ELmfv0xBjsFCUjDMfTULOjhoo0MUM28FMTtwrLeMSy/exec'
// const form = document.forms['submit-to-google-sheet']
// const btnKirim = document.querySelector('.btn-kirim')
// const btnLoading = document.querySelector('.btn-loading')
// const bWrapper = document.querySelector('.bwrapper-default')
// const bwrapperUpdated = document.querySelector('.bwrapper-updated')


// form.addEventListener('submit', e => {
//     e.preventDefault()
//     btnLoading.classList.toggle('d-none')
//     btnKirim.classList.toggle('d-none')
//     fetch(scriptURL, {
//         method: 'POST',
//         body: new FormData(form)
//       })
//       .then(response => {
//         // console.log('Success!', response)
//         btnLoading.classList.toggle('d-none')
//         btnKirim.classList.toggle('d-none')
//         form.reset()    
        
//         $.ajax(setting).done(function (datas) {
//               const data = datas.GoogleSheetData
//               var data_guest = '' 
//               $('.bwrapper-default').append(data_guest);
//             })
//       })
//       .catch(error => console.error('Error!', error.message))
//   })