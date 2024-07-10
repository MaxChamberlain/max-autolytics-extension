;(() => {
  if (document.querySelector('style.max-autolytics')) {
    const style = document.querySelector('style.max-autolytics')
    style.remove()
  }
  const style = document.createElement('style')
  style.classList.add('max-autolytics')
  style.innerHTML = ` 
      .max-autolytics-selector-row{
          border: 1px dashed hsl(220, 100%, 60%);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
      }
      
      .max-autolytics-selector-row:hover{
          border: 1px solid hsl(220, 100%, 40%);
          background-color: hsla(220, 100%, 40%, 0.2);
      }
      
      .max-autolytics-selector-row:hover::before{
          content: 'Select';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
          font-weight: 600;
          color: hsl(220, 100%, 40%);
      }
    `
  document.head.appendChild(style)

  const rows = document.querySelectorAll('.x-grid3-row')
  const selectorFrameworkRow = document.createElement('div')
  selectorFrameworkRow.classList.add('max-autolytics-selector-row')

  rows.forEach((row) => {
    row.style.position = 'relative'
    const nodeClone = selectorFrameworkRow.cloneNode(true)
    nodeClone.addEventListener('click', async (e) => {
      chrome.runtime.sendMessage({
        action: 'remove-sale-grabbers'
      })

      const statusDisplay = document.createElement('div')
      statusDisplay.id = 'autolytics-status-display'
      statusDisplay.style.position = 'absolute'
      statusDisplay.style.top = '0'
      statusDisplay.style.left = '0'
      statusDisplay.style.height = '100%'
      statusDisplay.style.width = '100%'
      statusDisplay.style.backgroundColor = 'white'
      statusDisplay.style.zIndex = '1000'
      statusDisplay.style.display = 'flex'
      statusDisplay.style.justifyContent = 'center'
      statusDisplay.style.alignItems = 'center'
      statusDisplay.style.fontSize = '16px'
      statusDisplay.innerText = 'Getting this sale...'
      statusDisplay.border = '1px solid black'
      row.appendChild(statusDisplay)

      const data = e.target.parentElement
      let children = data.children[0].children[0].children
      children = Array.from(children).map((e) =>
        e.querySelectorAll('.ColumnField')
      )
      children = Array.from(Array.from(children)[0]).map((e) => [
        e.querySelector('.Label')?.innerText,
        e.querySelector('.Value')?.innerText
      ])
      const vinObject = children.find((e) => e[0] === 'VIN:')
      const vin = vinObject[1]

      const carData = await fetch(
        'https://provision.vauto.app.coxautoinc.com/Va/Inventory/InventoryData.ashx',
        {
          headers: {
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            newrelic:
              'eyJ2IjpbMCwxXSwiZCI6eyJ0eSI6IkJyb3dzZXIiLCJhYyI6IjE4OTM0NTQiLCJhcCI6IjM3Mjc3NDQwNiIsImlkIjoiNDA0MmY0YjI0ODQwNWQ3YyIsInRyIjoiY2M4NzI4OTY1Mzg3OGIyZTQ2OTY4NzQ1YzBjNGM4MDMiLCJ0aSI6MTcxMDUyMDAxNjU2MSwidGsiOiIxMTkwODkzIn19',
            'sec-ch-ua':
              '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            traceparent:
              '00-cc87289653878b2e46968745c0c4c803-4042f4b248405d7c-01',
            tracestate:
              '1190893@nr=0-1-1893454-372774406-4042f4b248405d7c----1710520016561',
            'x-newrelic-id': 'VQ4OUlJWDBADUlhUAgIPVFE=',
            'x-requested-with': 'XMLHttpRequest'
          },
          referrer:
            'https://provision.vauto.app.coxautoinc.com/Va/Inventory/Default.aspx?uq=1',
          referrerPolicy: 'strict-origin-when-cross-origin',
          body:
            'sorts=%5B%7B%22sort%22%3A%22DaysInInventory%22%2C%22dir%22%3A%22ASC%22%7D%5D&_pageSize=100&_sortBy=DaysInInventory%20ASC&_firstRecord=0&InventoryStatus=0&Historical=0&RetailWholesale=R&NewUsed=U&ExcludeFromCounts=0&customSettings=%5B%7B%22id%22%3A%22NADA_Retail%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Clean%22%2C%22conditionLabel%22%3A%22Clean%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22NADA_TradeIn%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Clean%22%2C%22conditionLabel%22%3A%22Clean%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KBBOnline_UCFPP%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KelleyBlueBook_Wholesale%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KelleyBlueBook_Retail%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%5D&HqTranferEntityNotSame=false&SalePending=&RankingBucket=&CustomDiscount=&ChildEntity=&QuickSearch=' +
            vin +
            '&IsExactWordMatch=false&gridSrcName=inventoryDetail&switchReport=',
          method: 'POST',
          mode: 'cors',
          credentials: 'include'
        }
      )
        .then((e) => e.text())
        .then((e) => {
          const statusDisplay = document.getElementById(
            'autolytics-status-display'
          )
          statusDisplay.innerText = 'Processing data...'
          let obj = e.replace(/\\n/g, ' ')
          obj = obj.replace(/new Date\((\d+)\)/g, '$1')
          obj = obj.replace(/\\\\\",\\\"/g, '","')
          obj = obj.replace(/\\\",\"/g, '","')
          obj = obj.replace(/\+/g, ' ')
          obj = obj.replace(/\\\ /g, ' ')
          obj = JSON.parse(obj)
          console.log(obj)
          if (obj.rows.length === 0) {
            if (
              document.querySelectorAll('.max-autolytics-selector-row') &&
              document.querySelectorAll('.max-autolytics-selector-row').length >
                0
            ) {
              document
                .querySelectorAll('.max-autolytics-selector-row')
                .forEach((element) => {
                  element.remove()
                })
            }
          }
          let returnObj = {}
          obj.columns.forEach((column, index) => {
            returnObj[column] = obj.rows[0][index]
          })
          returnObj.AppraisalCommmentRec = JSON.parse(
            returnObj.AppraisalCommmentRec
          )
          console.log(returnObj)
          return returnObj
        })
        .then((e) => {
          let notes = e['AppraisalCommmentRec']?.[0]?.comment ?? ''
          let v_initial_carg_h = ''
          let v_initial_carg_level = ''
          let v_initial_mmr = ''
          let v_msrp = ''
          let splitNotes = notes?.split(' ')?.map((e) => e)
          let v_initialCargurusSuggestedRange = [0, 0]
          let v_imv = ''
          if (splitNotes) {
            let foundCarg = false
            splitNotes.forEach((note, index) => {
              if (note.toUpperCase() === 'MSRP') {
                v_msrp = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
              }
              if (note.toUpperCase() === 'MMR') {
                v_initial_mmr = splitNotes[index + 1]
              }
              if (
                note.toUpperCase() === 'GR' ||
                note.toUpperCase() === 'GREAT'
              ) {
                if (foundCarg) {
                  v_initialCargurusSuggestedRange[1] = splitNotes[
                    index + 1
                  ]?.replace(/[^\d-]/g, '')
                } else {
                  v_initialCargurusSuggestedRange[0] = splitNotes[
                    index + 1
                  ]?.replace(/[^\d-]/g, '')
                  foundCarg = true
                }
                v_initial_carg_h = splitNotes[index + 1]
                v_initial_carg_level = 'greatPrice'
              }
              if (note.toUpperCase() === 'G' || note.toUpperCase() === 'GOOD') {
                if (foundCarg) {
                  v_initialCargurusSuggestedRange[1] = splitNotes[
                    index + 1
                  ]?.replace(/[^\d-]/g, '')
                } else {
                  v_initialCargurusSuggestedRange[0] = splitNotes[
                    index + 1
                  ]?.replace(/[^\d-]/g, '')
                  foundCarg = true
                }
                v_initial_carg_h = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
                v_initial_carg_level = 'goodPrice'
              }
              if (note.toUpperCase() === 'F' || note.toUpperCase() === 'FAIR') {
                if (foundCarg) {
                  v_initialCargurusSuggestedRange[1] = splitNotes[
                    index + 1
                  ]?.replace(/[^\d-]/g, '')
                } else {
                  v_initialCargurusSuggestedRange[0] = splitNotes[
                    index + 1
                  ]?.replace(/[^\d-]/g, '')
                  foundCarg = true
                }
                v_initial_carg_h = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
                v_initial_carg_level = 'fairPrice'
              }
              if (note.toUpperCase() === 'IMV') {
                if (foundCarg) {
                  v_initialCargurusSuggestedRange[1] = splitNotes[
                    index + 1
                  ]?.replace(/[^\d-]/g, '')
                } else {
                  v_initialCargurusSuggestedRange[0] = splitNotes[
                    index + 1
                  ]?.replace(/[^\d-]/g, '')
                  foundCarg = true
                }
                v_initial_carg_h = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
                v_initial_carg_level = 'fairPrice'
              }
              if (note.toUpperCase() === 'H' || note.toUpperCase() === 'HIGH') {
                if (foundCarg) {
                  v_initialCargurusSuggestedRange[1] = splitNotes[
                    index + 1
                  ]?.replace(/[^\d-]/g, '')
                } else {
                  v_initialCargurusSuggestedRange[0] = splitNotes[
                    index + 1
                  ]?.replace(/[^\d-]/g, '')
                  foundCarg = true
                }
                v_initial_carg_h = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
                v_initial_carg_level = 'highPrice'
              }
              if (
                note.toUpperCase() === 'OP' ||
                note.toUpperCase() === 'OVERPRICED'
              ) {
                if (foundCarg) {
                  v_initialCargurusSuggestedRange[1] = splitNotes[
                    index + 1
                  ]?.replace(/[^\d-]/g, '')
                } else {
                  v_initialCargurusSuggestedRange[0] = splitNotes[
                    index + 1
                  ]?.replace(/[^\d-]/g, '')
                  foundCarg = true
                }
                v_initial_carg_h = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
                v_initial_carg_level = 'overPrice'
              }
              if (note.toUpperCase() === 'IMV') {
                v_imv = splitNotes[index + 1]
              }
            })
          }
          if (
            parseInt(v_initialCargurusSuggestedRange[0]) >
            parseInt(v_initialCargurusSuggestedRange[1])
          ) {
            let temp = v_initialCargurusSuggestedRange[0]
            v_initialCargurusSuggestedRange[0] =
              v_initialCargurusSuggestedRange[1]
            v_initialCargurusSuggestedRange[1] = temp
          }
          let source = e['VehicleSource']
          if (e.InventoryTags) {
            if (e.InventoryTags.includes('source-')) {
              source = e.InventoryTags.split(',')[0]
                .split('source-')[1]
                ?.replace('-', ' ')
                .toUpperCase()
            }
          }
          let details = {
            vAutoId: e['Id'],
            StockNumber: e['StockNumber'],
            Odometer: e['Odometer'],
            VehicleFullName: e['VehicleTitle']?.toUpperCase(),
            Vin: e['Vin'],
            SourceName: source,
            ZipCode: e['AppraisedPostalCode'],
            IsCertified: e['IsCertified'] === 1 ? true : false,
            Notes: notes,
            DaysInInventory: e['DaysInInventory'],
            FinalACV: e['TotalCost'],
            InitialACV: e['AppraisedValue'],
            FinalManheimWholesale: e['Manheim_Wholesale'],
            InitialAskingPrice: e['InitialPendingPrice'],
            SellPrice: e['ListPrice'],
            PercentOfMarket: e['EffectivePercentOfMarket']
              ? Math.round(e['EffectivePercentOfMarket'] * 100)
              : undefined,
            InitialManheimWholesale: v_initial_mmr,
            MSRP: v_msrp,
            FinalInstantMarketValue: v_imv,
            Make: e['Make'],
            Model: e['Model'],
            ModelYear: e['ModelYear'],
            VehicleTrimLevel: e['Series'],
            DealerLogicalId: e['DealerLogicalId'],
            AppraisedValue: e['AppraisedValue']
          }
          if (!details.AppraisedValue) {
            details.AppraisedValue = e['InitialAppraisedValue']
          }
          if (!details.StartPrice) {
            details.StartPrice = e['ListPrice']
          }
          const statusDisplay = document.getElementById(
            'autolytics-status-display'
          )
          statusDisplay.innerText =
            'Got ' + details.VehicleFullName + ' : ' + details.StockNumber
          statusDisplay.style.backgroundColor = 'lightgreen'
          statusDisplay.style.cursor = 'pointer'
          statusDisplay.addEventListener('click', () => {
            statusDisplay.remove()
          })
          setTimeout(() => {
            statusDisplay.remove()
          }, 8000)
          chrome.runtime.sendMessage({
            action: 'update-sale-vehicle',
            data: details
          })
          return details
        })
        .catch(async (e) => {
          const carData = await fetch(
            'https://provision.vauto.app.coxautoinc.com/Va/Inventory/InventoryData.ashx',
            {
              headers: {
                accept: '*/*',
                'accept-language': 'en-US,en;q=0.9',
                'content-type':
                  'application/x-www-form-urlencoded; charset=UTF-8',
                newrelic:
                  'eyJ2IjpbMCwxXSwiZCI6eyJ0eSI6IkJyb3dzZXIiLCJhYyI6IjE4OTM0NTQiLCJhcCI6IjM3Mjc3NDQwNiIsImlkIjoiNDA0MmY0YjI0ODQwNWQ3YyIsInRyIjoiY2M4NzI4OTY1Mzg3OGIyZTQ2OTY4NzQ1YzBjNGM4MDMiLCJ0aSI6MTcxMDUyMDAxNjU2MSwidGsiOiIxMTkwODkzIn19',
                'sec-ch-ua':
                  '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                traceparent:
                  '00-cc87289653878b2e46968745c0c4c803-4042f4b248405d7c-01',
                tracestate:
                  '1190893@nr=0-1-1893454-372774406-4042f4b248405d7c----1710520016561',
                'x-newrelic-id': 'VQ4OUlJWDBADUlhUAgIPVFE=',
                'x-requested-with': 'XMLHttpRequest'
              },
              referrer:
                'https://provision.vauto.app.coxautoinc.com/Va/Inventory/Default.aspx?uq=1',
              referrerPolicy: 'strict-origin-when-cross-origin',
              body:
                'sorts=%5B%7B%22sort%22%3A%22DaysInInventory%22%2C%22dir%22%3A%22ASC%22%7D%5D&_pageSize=100&_sortBy=DaysInInventory%20ASC&_firstRecord=0&InventoryStatus=0&Historical=0&RetailWholesale=R&NewUsed=U&ExcludeFromCounts=0&customSettings=%5B%7B%22id%22%3A%22NADA_Retail%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Clean%22%2C%22conditionLabel%22%3A%22Clean%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22NADA_TradeIn%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Clean%22%2C%22conditionLabel%22%3A%22Clean%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KBBOnline_UCFPP%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KelleyBlueBook_Wholesale%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KelleyBlueBook_Retail%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%5D&HqTranferEntityNotSame=false&SalePending=&RankingBucket=&CustomDiscount=&ChildEntity=&QuickSearch=' +
                vin +
                '&IsExactWordMatch=false&gridSrcName=inventoryDetail&switchReport=&HistoricalDaySpan=90',
              method: 'POST',
              mode: 'cors',
              credentials: 'include'
            }
          )
            .then((e) => e.text())
            .then((e) => {
              const statusDisplay = document.getElementById(
                'autolytics-status-display'
              )
              statusDisplay.innerText = 'Processing data...'
              let obj = e.replace(/\\n/g, ' ')
              obj = obj.replace(/new Date\((\d+)\)/g, '$1')
              obj = obj.replace(/\\\\\",\\\"/g, '","')
              obj = obj.replace(/\\\",\"/g, '","')
              obj = obj.replace(/\+/g, ' ')
              obj = obj.replace(/\\\ /g, ' ')
              obj = JSON.parse(obj)
              console.log(obj)
              if (obj.rows.length === 0) {
                if (
                  document.querySelectorAll('.max-autolytics-selector-row') &&
                  document.querySelectorAll('.max-autolytics-selector-row')
                    .length > 0
                ) {
                  document
                    .querySelectorAll('.max-autolytics-selector-row')
                    .forEach((element) => {
                      element.remove()
                    })
                }
              }
              let returnObj = {}
              obj.columns.forEach((column, index) => {
                returnObj[column] = obj.rows[0][index]
              })
              returnObj.AppraisalCommmentRec = JSON.parse(
                returnObj.AppraisalCommmentRec
              )
              console.log(returnObj)
              return returnObj
            })
            .then((e) => {
              let notes = e['AppraisalCommmentRec']?.[0]?.comment ?? ''
              let v_initial_carg_h = ''
              let v_initial_carg_level = ''
              let v_initial_mmr = ''
              let v_msrp = ''
              let splitNotes = notes?.split(' ')?.map((e) => e)
              let v_initialCargurusSuggestedRange = [0, 0]
              let v_imv = ''
              if (splitNotes) {
                let foundCarg = false
                splitNotes.forEach((note, index) => {
                  if (note.toUpperCase() === 'MSRP') {
                    v_msrp = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
                  }
                  if (note.toUpperCase() === 'MMR') {
                    v_initial_mmr = splitNotes[index + 1]
                  }
                  if (
                    note.toUpperCase() === 'GR' ||
                    note.toUpperCase() === 'GREAT'
                  ) {
                    if (foundCarg) {
                      v_initialCargurusSuggestedRange[1] = splitNotes[
                        index + 1
                      ]?.replace(/[^\d-]/g, '')
                    } else {
                      v_initialCargurusSuggestedRange[0] = splitNotes[
                        index + 1
                      ]?.replace(/[^\d-]/g, '')
                      foundCarg = true
                    }
                    v_initial_carg_h = splitNotes[index + 1]
                    v_initial_carg_level = 'greatPrice'
                  }
                  if (
                    note.toUpperCase() === 'G' ||
                    note.toUpperCase() === 'GOOD'
                  ) {
                    if (foundCarg) {
                      v_initialCargurusSuggestedRange[1] = splitNotes[
                        index + 1
                      ]?.replace(/[^\d-]/g, '')
                    } else {
                      v_initialCargurusSuggestedRange[0] = splitNotes[
                        index + 1
                      ]?.replace(/[^\d-]/g, '')
                      foundCarg = true
                    }
                    v_initial_carg_h = splitNotes[index + 1]?.replace(
                      /[^\d-]/g,
                      ''
                    )
                    v_initial_carg_level = 'goodPrice'
                  }
                  if (
                    note.toUpperCase() === 'F' ||
                    note.toUpperCase() === 'FAIR'
                  ) {
                    if (foundCarg) {
                      v_initialCargurusSuggestedRange[1] = splitNotes[
                        index + 1
                      ]?.replace(/[^\d-]/g, '')
                    } else {
                      v_initialCargurusSuggestedRange[0] = splitNotes[
                        index + 1
                      ]?.replace(/[^\d-]/g, '')
                      foundCarg = true
                    }
                    v_initial_carg_h = splitNotes[index + 1]?.replace(
                      /[^\d-]/g,
                      ''
                    )
                    v_initial_carg_level = 'fairPrice'
                  }
                  if (note.toUpperCase() === 'IMV') {
                    if (foundCarg) {
                      v_initialCargurusSuggestedRange[1] = splitNotes[
                        index + 1
                      ]?.replace(/[^\d-]/g, '')
                    } else {
                      v_initialCargurusSuggestedRange[0] = splitNotes[
                        index + 1
                      ]?.replace(/[^\d-]/g, '')
                      foundCarg = true
                    }
                    v_initial_carg_h = splitNotes[index + 1]?.replace(
                      /[^\d-]/g,
                      ''
                    )
                    v_initial_carg_level = 'fairPrice'
                  }
                  if (
                    note.toUpperCase() === 'H' ||
                    note.toUpperCase() === 'HIGH'
                  ) {
                    if (foundCarg) {
                      v_initialCargurusSuggestedRange[1] = splitNotes[
                        index + 1
                      ]?.replace(/[^\d-]/g, '')
                    } else {
                      v_initialCargurusSuggestedRange[0] = splitNotes[
                        index + 1
                      ]?.replace(/[^\d-]/g, '')
                      foundCarg = true
                    }
                    v_initial_carg_h = splitNotes[index + 1]?.replace(
                      /[^\d-]/g,
                      ''
                    )
                    v_initial_carg_level = 'highPrice'
                  }
                  if (
                    note.toUpperCase() === 'OP' ||
                    note.toUpperCase() === 'OVERPRICED'
                  ) {
                    if (foundCarg) {
                      v_initialCargurusSuggestedRange[1] = splitNotes[
                        index + 1
                      ]?.replace(/[^\d-]/g, '')
                    } else {
                      v_initialCargurusSuggestedRange[0] = splitNotes[
                        index + 1
                      ]?.replace(/[^\d-]/g, '')
                      foundCarg = true
                    }
                    v_initial_carg_h = splitNotes[index + 1]?.replace(
                      /[^\d-]/g,
                      ''
                    )
                    v_initial_carg_level = 'overPrice'
                  }
                  if (note.toUpperCase() === 'IMV') {
                    v_imv = splitNotes[index + 1]
                  }
                })
              }
              if (
                parseInt(v_initialCargurusSuggestedRange[0]) >
                parseInt(v_initialCargurusSuggestedRange[1])
              ) {
                let temp = v_initialCargurusSuggestedRange[0]
                v_initialCargurusSuggestedRange[0] =
                  v_initialCargurusSuggestedRange[1]
                v_initialCargurusSuggestedRange[1] = temp
              }
              let source = e['VehicleSource']
              if (e.InventoryTags) {
                if (e.InventoryTags.includes('source-')) {
                  source = e.InventoryTags.split(',')[0]
                    .split('source-')[1]
                    ?.replace('-', ' ')
                    .toUpperCase()
                }
              }
              let details = {
                vAutoId: e['Id'],
                StockNumber: e['StockNumber'],
                Odometer: e['Odometer'],
                VehicleFullName: e['VehicleTitle']?.toUpperCase(),
                Vin: e['Vin'],
                SourceName: source,
                ZipCode: e['AppraisedPostalCode'],
                IsCertified: e['IsCertified'] === 1 ? true : false,
                Notes: notes,
                DaysInInventory: e['DaysInInventory'],
                FinalACV: e['TotalCost'],
                InitialACV: e['AppraisedValue'],
                FinalManheimWholesale: e['Manheim_Wholesale'],
                InitialAskingPrice: e['InitialPendingPrice'],
                SellPrice: e['ListPrice'],
                PercentOfMarket: e['EffectivePercentOfMarket']
                  ? Math.round(e['EffectivePercentOfMarket'] * 100)
                  : undefined,
                InitialManheimWholesale: v_initial_mmr,
                MSRP: v_msrp,
                FinalInstantMarketValue: v_imv,
                Make: e['Make'],
                Model: e['Model'],
                ModelYear: e['ModelYear'],
                VehicleTrimLevel: e['Series'],
                DealerLogicalId: e['DealerLogicalId'],
                AppraisedValue: e['AppraisedValue']
              }
              if (!details.AppraisedValue) {
                details.AppraisedValue = e['InitialAppraisedValue']
              }
              if (!details.StartPrice) {
                details.StartPrice = e['ListPrice']
              }
              const statusDisplay = document.getElementById(
                'autolytics-status-display'
              )
              statusDisplay.innerText =
                'Got ' + details.VehicleFullName + ' : ' + details.StockNumber
              statusDisplay.style.backgroundColor = 'lightgreen'
              statusDisplay.style.cursor = 'pointer'
              statusDisplay.addEventListener('click', () => {
                statusDisplay.remove()
              })
              setTimeout(() => {
                statusDisplay.remove()
              }, 8000)
              chrome.runtime.sendMessage({
                action: 'update-sale-vehicle',
                data: details
              })
              return details
            })
            .catch((e) => {
              console.log(e)
              const statusDisplay = document.getElementById(
                'autolytics-status-display'
              )
              statusDisplay.innerText = 'Error getting sale'
              statusDisplay.style.backgroundColor = 'red'
              statusDisplay.style.cursor = 'pointer'
              statusDisplay.addEventListener('click', () => {
                statusDisplay.remove()
              })
              setTimeout(() => {
                statusDisplay.remove()
              }, 15000)
            })
        })
    })

    row.appendChild(nodeClone)
  })
})()
