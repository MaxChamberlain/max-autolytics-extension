chrome.storage.local.get('saleVehicle', (data) => {
  if (data) {
    document
      .getElementById('invisible-data-input')
      .setAttribute('data', JSON.stringify(data.saleVehicle))
    document.getElementById('invisible-data-input').dispatchEvent(
      new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      })
    )
  } else {
    console.log('No data')
  }
})
