;(() => {
  const rows = document.querySelectorAll('.x-grid3-row')
  rows.forEach((row) => {
    const columns = row.querySelectorAll('.ColumnField')
    const hasSource = Array.from(columns).some((column) => {
      return (
        column.innerText.trim().toUpperCase().includes('VEHICLE SOURCE:') ||
        column.innerText.trim().toUpperCase().includes('SOURCE-')
      )
    })
    console.log(hasSource)
    if (hasSource) {
      row.style.display = 'none'
    }
  })
})()
