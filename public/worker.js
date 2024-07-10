const allowedOrigins = [
  'https://profittime.vauto.app.coxautoinc.com',
  'https://provision.vauto.app.coxautoinc.com',
  'https://beta.maxautolytics.com',
  'https://maxautolytics.com',
  'https://v3.maxautolytics.com',
  'localhost'
]

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request)

  if (request.action === 'isOnAuthedSite') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0]
      const url = new URL(tab.url)
      const origin = url.origin
      const isOnAuthedSite = allowedOrigins.some((allowedOrigin) =>
        origin.includes(allowedOrigin)
      )
      sendResponse([isOnAuthedSite, origin])
    })
    return true
  }

  if (request.action === 'get-credentials') {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        try {
          const tab = tabs[0]
          const result = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: function () {
              const credentials = localStorage.getItem('Authorization')
              return credentials
            }
          })
          console.log(result)
          sendResponse(result[0].result)
        } catch (error) {
          console.log(error)
          sendResponse(null)
        }
      }
    )
    return true
  }

  if (request.action === 'get-vauto-store') {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        try {
          const tab = tabs[0]
          const result = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: function () {
              const storeName =
                document.querySelector('.headerEntity')?.innerText
              return storeName
            }
          })
          sendResponse(result[0].result)
        } catch (error) {
          console.log(error)
          sendResponse(null)
        }
      }
    )
    return true
  }

  if (request.action === 'get-vauto-inventory') {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        try {
          const tab = tabs[0]
          const result = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: async function () {
              try {
                const storeName =
                  document.querySelector('.headerEntity')?.innerText

                const inventory = await fetch(
                  'https://provision.vauto.app.coxautoinc.com/Va/Inventory/InventoryData.ashx',
                  {
                    headers: {
                      accept: '*/*',
                      'accept-language': 'en-US,en;q=0.9',
                      'content-type':
                        'application/x-www-form-urlencoded; charset=UTF-8',
                      'save-data': 'on',
                      'sec-ch-ua':
                        '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
                      'sec-ch-ua-mobile': '?0',
                      'sec-ch-ua-platform': '"macOS"',
                      'sec-fetch-dest': 'empty',
                      'sec-fetch-mode': 'cors',
                      'sec-fetch-site': 'same-origin',
                      'x-requested-with': 'XMLHttpRequest'
                    },
                    referrer:
                      'https://provision.vauto.app.coxautoinc.com/Va/Inventory/',
                    referrerPolicy: 'strict-origin-when-cross-origin',
                    body: '_pageSize=1000&_sortBy=DaysInInventory%20ASC&sorts=&_firstRecord=0&InventoryStatus=0&Historical=0&RetailWholesale=R&NewUsed=U&ExcludeFromCounts=0&customSettings=%5B%7B id %3A NADA_Retail %2C value %3A 0 %2C condition %3A Clean %2C conditionLabel %3A Clean %2C type %3A priceguide %7D%2C%7B id %3A NADA_TradeIn %2C value %3A 0 %2C condition %3A Clean %2C conditionLabel %3A Clean %2C type %3A priceguide %7D%2C%7B id %3A KBBOnline_UCFPP %2C value %3A 0 %2C condition %3A Excellent %2C conditionLabel %3A Excellent %2C type %3A priceguide %7D%2C%7B id %3A KelleyBlueBook_Wholesale %2C value %3A 0 %2C condition %3A Excellent %2C conditionLabel %3A Excellent %2C type %3A priceguide %7D%2C%7B id %3A KelleyBlueBook_Retail %2C value %3A 0 %2C condition %3A Excellent %2C conditionLabel %3A Excellent %2C type %3A priceguide %7D%5D&HqTranferEntityNotSame=false&QuickSearch=&SalePending=&PricingTargetSetId=&RankingBucket=&ChildEntity=&gridSrcName=inventoryDetail&switchReport=',
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include'
                  }
                )
                  .then((e) => e.text())
                  .then((e) => {
                    let obj = e
                    obj = obj.replace(/new Date\((\d+)\)/g, '$1')
                    obj = JSON.parse(obj)
                    console.log(obj)
                    let returnObjs = []
                    let keys = []
                    obj.columns.forEach((column, index) => {
                      keys[index] = column
                    })
                    obj.rows.forEach((row, index) => {
                      let obj = {}
                      row.forEach((column, index) => {
                        obj[keys[index]] = column
                      })
                      let source = obj['VehicleSource']
                      if (obj.InventoryTags) {
                        if (obj.InventoryTags.includes('source-')) {
                          if (
                            obj.InventoryTags.split(',')[0].split('source-')
                              .length > 1
                          ) {
                            source = obj.InventoryTags.split(',')[0]
                              .split('source-')[1]
                              .replace(/-/g, ' ')
                              .toUpperCase()
                          }
                        }
                      }
                      obj['VehicleSource'] = source
                      returnObjs[index] = obj
                      if (obj['VehicleSource'] !== source || !source)
                        console.log(obj['VehicleSource'], source, obj['Vin'])
                    })
                    return returnObjs
                  })
                const DealerLogicalId = storeName.split(' - ')[1].trim()
                return { data: inventory, DealerLogicalId }
              } catch (error) {
                console.log(error)
                return null
              }
            }
          })
          console.log(result)
          sendResponse(result[0].result)
        } catch (error) {
          console.log(error)
          sendResponse(null)
        }
      }
    )
    return true
  }

  if (request.action === 'create-sale-grabbers') {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        const tab = tabs[0]
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['create-sale-grabbers.js']
        })
      }
    )
  }

  if (request.action === 'remove-sale-grabbers') {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        const tab = tabs[0]
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['remove-sale-grabbers.js']
        })
      }
    )
  }

  if (request.action === 'update-sale-vehicle') {
    chrome.storage.local.set({ saleVehicle: request.data })
    return true
  }

  if (request.action === 'put-sale-vehicle') {
    chrome.storage.local.get('saleVehicle', (data) => {
      if (data) {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          async function (tabs) {
            try {
              const tab = tabs[0]
              chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['put-sale-vehicle.js']
              })
            } catch (error) {
              console.log(error)
            }
          }
        )
      } else {
        console.log('No data')
      }
    })
  }

  if (request.action === 'filter-no-source') {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        const tab = tabs[0]
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['filter-no-source.js']
        })
      }
    )
  }
})

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    const url = new URL(tab.url)
    const origin = url.origin

    if (origin.includes('maxautolytics.com') || origin.includes('localhost')) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: function () {
          chrome.storage.local.get('saleVehicle', (data) => {
            if (!data.saleVehicle) return
            if (document.getElementById('invisible-data-input')) {
              const script = document.getElementById('invisible-data-input')
              if (data) {
                script.setAttribute('data', JSON.stringify(data.saleVehicle))
                script.click()
                chrome.storage.local.remove('saleVehicle')
              } else {
                console.log('No data')
              }
            } else if (document.getElementById('add-sale-btn')) {
              setTimeout(() => {
                document.getElementById('add-sale-btn').click()
                setTimeout(() => {
                  if (document.getElementById('invisible-data-input')) {
                    const script = document.getElementById(
                      'invisible-data-input'
                    )
                    if (data) {
                      script.setAttribute(
                        'data',
                        JSON.stringify(data.saleVehicle)
                      )
                      script.click()
                      chrome.storage.local.remove('saleVehicle')
                    } else {
                      console.log('No data')
                    }
                  }
                }, 1000)
              }, 500)
            }
          })
        }
      })
    }
  })
})
