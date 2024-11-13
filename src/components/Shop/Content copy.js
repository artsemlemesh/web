/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global google */
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Label, Icon, Checkbox, Loader } from 'semantic-ui-react'
import { getItem, setItem } from '../../helpers/storage'
import Select from 'react-select'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TreeItem from '@mui/lab/TreeItem'
import { filterData, applyFilter, getShopList } from '../../store/actions/shop'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useParams } from 'react-router-dom'

import FlatList from 'flatlist-react'

import ListingRow from './ListingRow'
import GoogleTap from '../Common/GoogleTap'

function Content() {
  const shop = useSelector((state) => state.shop.shops)
  const dispatch = useDispatch()
  const options = useSelector((state) => state.shop.options)

  let { slug } = useParams()
  const gender = [
    {
      id: 'boy',
      name: 'Boys',
      value: false,
    },
    {
      id: 'girl',
      name: 'Girls',
      value: false,
    },
    {
      id: 'neutral',
      name: 'Gender Neutral',
      value: false,
    },
  ]
  const [hasMoreListings, setHasMoreListings] = useState(false)
  const [genderSlection, setGenderSelection] = useState(gender)
  const [sizeSelection, setSizeSelection] = useState([])
  const [selectedOption, setSelectedOption] = useState()
  const [maxPrice, setMaxPrice] = useState([])
  const [minPrice, setMinPrice] = useState([])
  const [maxItem, setMaxItem] = useState([])
  const [minItem, setMinItem] = useState([])
  const [catData, setcatData] = useState([])
  const [brandsData, setBrandData] = useState([])
  const [sortData, setSortData] = useState([])
  const [sizesData, setSizesData] = useState([])
  const [genderData, setGenderData] = useState([])
  const [commonSize, setCommonSize] = useState([])
  const [shoesSize, setShoesSize] = useState([])
  const [catNameData, setCatNameData] = useState([])
  const [brandsNameData, setBrandNameData] = useState([])
  const [sortNameData, setSortNameData] = useState([])
  const [sizesNameData, setSizesNameData] = useState([])
  const [genderNameData, setGenderNameData] = useState([])
  const [minmaxPrice, setMinMaxPrice] = useState([])
  const [minmaxItem, setMinMaxItem] = useState([])
  const [filterDataUrl, setFilterDataUrl] = useState([])
  const sortBy = [
    {
      id: 'relevance',
      name: 'Relevance',
    },
    {
      id: 'newest',
      name: 'Newest',
    },
    {
      id: 'price_asc',
      name: 'Price Lowest to Highest',
    },
    {
      id: 'price_desc',
      name: 'Price Highest to Lowest',
    },
  ]

  let brandsArray = []
  let sortArray = []
  let categoryArray = []
  let sizeArray = []
  if (options && options.brands) {
    let brands = options.brands
    if (brands && brands.length > 0) {
      brands.map((items) => {
        let obj = {
          value: items.id,
          label: items.name,
        }
        return brandsArray.push(obj)
      })
    }
  }

  sortBy.map((items) => {
    let obj = {
      value: items.id,
      label: items.name,
    }
    return sortArray.push(obj)
  })

  if (options && options.categories) {
    categoryArray = options.categories
  }
  if (options && options.sizes) {
    sizeArray = options.sizes
  }

  useEffect(() => {
    dispatch(applyFilter())
  }, [])

  useEffect(() => {
    setItem('isLoading', 'true')
    const obj = {
      onSuccess: () => setItem('isLoading', 'false'),
      onFail: () => setItem('isLoading', 'false'),
    }
    dispatch(getShopList(obj))
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = () => {
    const nextUrl = getItem('nextURL')
    const isLoading = getItem('isLoading')
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight
    if (
      scrollTop + window.innerHeight + 300 >= scrollHeight &&
      isLoading === 'false' &&
      nextUrl != 'null'
    ) {
      setItem('isLoading', 'true')
      let obj = {
        url: nextUrl,
        onSuccess: () => setItem('isLoading', 'false'),
        onFail: () => setItem('isLoading', 'false'),
      }
      setHasMoreListings(true)
      dispatch(getShopList(obj))
    } else if (nextUrl == 'null') {
      setHasMoreListings(false)
    }
  }

  useEffect(() => {
    if (slug && slug.match('&')) {
      let genderSlug = slug.split('&')
      let genderUrl = []
      let genderId = []
      genderSlug.map((slugItem) => {
        gender.map((item) => {
          if (item.id === slugItem.substring(slugItem.indexOf('=') + 1, slugItem.legnth)) {
            genderUrl.push(item.name)
            genderId.push(`items__gender=${item.id}`)
          }
        })
        genderSlection.map((itemsData) => {
          if (
            itemsData.id === slugItem.substring(slugItem.indexOf('=') + 1, slugItem.length) &&
            itemsData.value === false
          ) {
            itemsData.value = true
          }
        })
        setGenderSelection([...genderSlection])
      })
      setFilterDataUrl(genderUrl)
      setGenderNameData(genderUrl)
      setGenderData(genderId)

      if (genderUrl.legnth > 0)
        applyFilterData(catData, sizesData, brandsData, genderId, sortData, minmaxPrice, minmaxItem)
      displayUrl(catNameData, sizesNameData, brandsNameData, genderUrl, sortNameData)
      if (genderSlection && genderSlection.length > 0) {
        genderSlug.map((slugItem) => {
          genderSlection.map((itemsData) => {
            if (itemsData.id === slugItem && itemsData.value === false) {
              itemsData.value = true
            }
          })
        })
        setGenderSelection([...genderSlection])
      }
    }
    if (gender && gender.length > 0) {
      gender.map((item) => {
        if (item.id === slug) {
          setFilterDataUrl(...filterDataUrl, ...[item.name])
          setGenderData([`items__gender=${item.id}`])
          setGenderNameData([item.name])
          applyFilterData(
            catData,
            sizesData,
            brandsData,
            [`items__gender=${item.id}`],
            sortData,
            minmaxPrice,
            minmaxItem,
          )
          displayUrl(catNameData, sizesNameData, brandsNameData, [item.name], sortNameData)
        }
      })
      if (genderSlection && genderSlection.length > 0) {
        genderSlection.map((itemsData) => {
          if (itemsData.id === slug && itemsData.value === false) {
            itemsData.value = true
          }
        })
        setGenderSelection([...genderSlection])
      }
    }

    if (options && options.categories && options.categories.length > 0) {
      options.categories.map((item) => {
        item.children.map((item) => {
          if (item.slug === slug) {
            setFilterDataUrl([item.name])
            setCatNameData([item.name])
            setcatData([`items__category=${item.id}`])
            applyFilterData(
              [`items__category=${item.id}`],
              sizesData,
              brandsData,
              genderData,
              sortData,
              minmaxPrice,
              minmaxItem,
            )
            displayUrl([item.name], sizesNameData, brandsNameData, genderNameData, sortNameData)
          }
        })
      })
    }
    if (options && options.brands && options.brands.length > 0) {
      options.brands.map((brandItem) => {
        if (brandItem.slug === slug) {
          setFilterDataUrl(...filterDataUrl, ...[brandItem.name])
          setBrandData([`items__brand=${brandItem.id}`])
          setBrandNameData([brandItem.name])
          applyFilterData(
            catData,
            sizesData,
            [`items__brand=${brandItem.id}`],
            genderData,
            sortData,
            minmaxPrice,
            minmaxItem,
          )
          displayUrl(catNameData, sizesNameData, [brandItem.name], genderNameData, sortNameData)
        }
      })
    }
    if (options && options.sizes && options.sizes.length > 0) {
      options.sizes.map((sizeItem) => {
        if (sizeItem.slug === slug) {
          setFilterDataUrl(...filterDataUrl, ...[sizeItem.name])
          setSizesData([`items__size=${sizeItem.id}`])
          setSizesNameData([sizeItem.name])
          applyFilterData(
            catData,
            [`items__size=${sizeItem.id}`],
            brandsData,
            genderData,
            sortData,
            minmaxPrice,
            minmaxItem,
          )
          displayUrl(catNameData, [sizeItem.name], brandsNameData, genderNameData, sortNameData)
        }
      })
    }
  }, [options])

  useEffect(() => {
    let newSize = []
    let shoes = []
    let sizedata = []
    let shoesData = []
    sizeArray.map((item) => {
      if (item.name === 'Clothing') {
        item.children.map((size) => {
          let obj = { ...size, value: false }
          newSize.push(obj)
        })
        let obje = {
          id: item.id,
          name: item.name,
          slug: item.slug,
          title: item.title,
          children: newSize,
        }

        sizedata.push(obje)
      } else {
        item.children.map((size) => {
          let obj = { ...size, value: false }
          shoes.push(obj)
        })
        let obje = {
          id: item.id,
          name: item.name,
          slug: item.slug,
          title: item.title,
          children: shoes,
        }
        shoesData.push(obje)
      }
    })

    setSizeSelection(sizedata)
    setCommonSize(sizedata)
    setShoesSize(shoesData)
  }, [options])

  const brandIdData = (selectedOption) => {
    if (selectedOption && selectedOption.length > 0) {
      let brandId = selectedOption.map((item) => {
        return item.length > 0 ? [] : `items__brand=${item.value}`
      })

      let bradName = selectedOption.map((item) => {
        return item.label
      })

      setBrandData(brandId)
      setBrandNameData(bradName)
      applyFilterData(catData, sizesData, brandId, genderData, sortData, minmaxPrice, minmaxItem)
      displayUrl(catNameData, sizesNameData, bradName, genderNameData, sortNameData)
    } else {
      setBrandData([])
      setBrandNameData([])
      applyFilterData(catData, sizesData, [], genderData, sortData, minmaxPrice, minmaxItem)
      displayUrl(catNameData, sizesNameData, [], genderNameData, sortNameData)
    }
  }

  const sortIdData = (Option) => {
    let selectedOption = [Option]

    if (selectedOption && selectedOption.length > 0) {
      let sortId = selectedOption.map((item) => {
        return item.length > 0 ? [] : `ordering=${item.value}`
      })

      let sortName = selectedOption.map((item) => {
        return item.label
      })
      setSortData(sortId)
      setSortNameData(sortName)
      applyFilterData(catData, sizesData, brandsData, genderData, sortId, minmaxPrice, minmaxItem)
      displayUrl(catNameData, sizesNameData, brandsNameData, genderNameData, sortName)
    } else {
      setBrandData([])
      setBrandNameData([])
      applyFilterData(catData, sizesData, brandsData, genderData, [], minmaxPrice, minmaxItem)
      displayUrl(catNameData, sizesNameData, brandsNameData, genderNameData, [])
    }
  }

  const cateIdData = (item, name) => {
    let categoryFilterId = []
    let categoryFilterName = []

    if (options && options.categories) {
      categoryFilterId.push(`items__category=${item}`)
      categoryFilterName.push(name)
      options.categories.map((catItem) => {
        if (catItem.id === item) {
          catItem.children.map((children) => {
            categoryFilterId.push(`items__category=${children.id}`)
            categoryFilterName.push(children.name)
          })
        }
      })

      setcatData(categoryFilterId)
      setCatNameData(categoryFilterName)
    }

    if (sizeSelection) {
      if (name === 'Baby Shoes') {
        setSizeSelection(shoesSize)
      } else if (name !== 'Baby Shoes') {
        setSizeSelection(commonSize)
      }
    }

    applyFilterData(
      categoryFilterId,
      sizesData,
      brandsData,
      genderData,
      sortData,
      minmaxPrice,
      minmaxItem,
    )
    displayUrl(categoryFilterName, sizesNameData, brandsNameData, genderNameData, sortNameData)
  }

  const sizeIdData = (item, name) => {
    let newArray = []
    let nameArray = []
    if (sizesData.length == 0) {
      newArray = [...[`items__size=${item}`], ...sizesData]
      nameArray = [...[name], ...sizesNameData]
      setSizesData(newArray)
      setSizesNameData(nameArray)
    } else if (sizesData.length > 0) {
      let sizeindex = sizesData.findIndex((finditem) => {
        return finditem === `items__size=${item}`
      })
      if (sizeindex == -1) {
        newArray = [...sizesData, ...[`items__size=${item}`]]
        nameArray = [...sizesNameData, ...[name]]
        setSizesData(newArray)
        setSizesNameData(nameArray)
      } else {
        let sizeUnselectedItem = sizesData.filter((sizeUnselectedItem) => {
          return sizeUnselectedItem !== `items__size=${item}`
        })
        let sizeUnselectedItemName = sizesNameData.filter((sizeUnselectedItemN) => {
          return sizeUnselectedItemN !== name
        })
        newArray = sizeUnselectedItem
        nameArray = sizeUnselectedItemName
        setSizesData(newArray)
        setSizesNameData(nameArray)
      }
    }

    applyFilterData(catData, newArray, brandsData, genderData, sortData, minmaxPrice, minmaxItem)
    displayUrl(catNameData, nameArray, brandsNameData, genderNameData, sortNameData)
  }

  const genderIdData = (item, name) => {
    let newArray = []
    let nameArray = []
    if (genderData.length == 0) {
      newArray = [...[`items__gender=${item}`], ...genderData]
      nameArray = [...[name], ...genderNameData]
      setGenderData(newArray)
      setGenderNameData(nameArray)
    } else if (genderData.length > 0) {
      let genderindex = genderData.findIndex((finditem) => {
        return finditem === `items__gender=${item}`
      })
      if (genderindex == -1) {
        newArray = [...genderData, ...[`items__gender=${item}`]]
        nameArray = [...genderNameData, ...[name]]
        setGenderData(newArray)
        setGenderNameData(nameArray)
      } else {
        let genderUnselectedId = genderData.filter((genderUnselectedId) => {
          return genderUnselectedId !== `items__gender=${item}`
        })
        let genderUnselectedName = genderNameData.filter((genderUnselectedNameItem) => {
          return genderUnselectedNameItem !== name
        })
        newArray = genderUnselectedId
        nameArray = genderUnselectedName
        setGenderData(newArray)
        setGenderNameData(nameArray)
      }
    }
    applyFilterData(catData, sizesData, brandsData, newArray, sortData, minmaxPrice, minmaxItem)
    displayUrl(catNameData, sizesNameData, brandsNameData, nameArray, sortNameData)
  }

  const minmaxprice = () => {
    let minmaxP = []
    if (minPrice > 0) {
      minmaxP.push(`minprice=${minPrice}`)
    }

    if (maxPrice > 0) {
      minmaxP.push(`maxprice=${maxPrice}`)
    }
    setMinMaxPrice(minmaxP)
    applyFilterData(catData, sizesData, brandsData, genderData, sortData, minmaxP, minmaxItem)
  }
  const minmaxitem = () => {
    let minmaxI = []
    if (minItem > 0) {
      minmaxI.push(`minitem=${minItem}`)
    }
    if (maxItem > 0) {
      minmaxI.push(`maxitem=${maxItem}`)
    }
    setMinMaxItem(minmaxI)
    applyFilterData(catData, sizesData, brandsData, genderData, sortData, minmaxPrice, minmaxI)
  }

  const replaceUrlData = (urlPath, urlData) => {
    let catArray = []

    if (urlData.length !== 0) {
      urlData.map((item) => {
        if (item.substring(0, item.indexOf('=')) === 'items__category') {
          categoryArray &&
            categoryArray.length > 0 &&
            categoryArray.map((catItem) => {
              if (catItem.id === parseInt(item.substring(item.indexOf('=') + 1, item.length))) {
                catArray.push(`items__category=${catItem.slug}`)
              } else {
                catItem.children.map((childItem) => {
                  if (
                    childItem.id === parseInt(item.substring(item.indexOf('=') + 1, item.length))
                  ) {
                    catArray.push(`items__category=${childItem.slug}`)
                  }
                })
              }
            })
        } else if (item.substring(0, item.indexOf('=')) === 'items__size') {
          options.sizes.map((size) => {
            size.children.map((sizeItem) => {
              if (sizeItem.id === parseInt(item.substring(item.indexOf('=') + 1, item.length))) {
                catArray.push(`items__size=${sizeItem.slug}`)
              }
            })
          })
        } else {
          catArray.push(item)
        }
      })
    }

    let url = catArray

    let replaceUrl = ''

    if (url.length !== 0) {
      replaceUrl = '/shop?' + url.join('?')
      window.history.pushState('', '', replaceUrl)
    } else {
      replaceUrl = '/shop'
      window.history.pushState('', '', replaceUrl)
      const gender = [
        {
          id: 'boy',
          name: 'Boys',
          value: false,
        },
        {
          id: 'girl',
          name: 'Girls',
          value: false,
        },
        {
          id: 'neutral',
          name: 'Gender Neutral',
          value: false,
        },
      ]

      let newSize = []
      let shoes = []
      let sizedata = []
      let shoesData = []
      options.sizes.map((item) => {
        if (item.name === 'Clothing') {
          item.children.map((size) => {
            let obj = { ...size, value: false }
            newSize.push(obj)
          })
          let obje = {
            id: item.id,
            name: item.name,
            slug: item.slug,
            title: item.title,
            children: newSize,
          }

          sizedata.push(obje)
        } else {
          item.children.map((size) => {
            let obj = { ...size, value: false }
            shoes.push(obj)
          })
          let obje = {
            id: item.id,
            name: item.name,
            slug: item.slug,
            title: item.title,
            children: shoes,
          }
          shoesData.push(obje)
        }
      })

      setSizeSelection(sizedata)
      setCommonSize(sizedata)
      setShoesSize(shoesData)
      setBrandData([])
      setBrandNameData([])
      setSizesData([])
      setSizesNameData([])
      setcatData([])
      setCatNameData([])
      setGenderData([])
      setGenderNameData([])
      setSortData([])
      setSortNameData([])
      setFilterDataUrl([])
      setGenderSelection(gender)
      setSelectedOption([])
      dispatch(getShopList())
    }
  }

  const applyFilterData = (
    catArray,
    sizeArray,
    brandArray,
    genderArray,
    sortDataArray,
    priceArray,
    itemArray,
  ) => {
    let urlData = [
      ...catArray,
      ...sizeArray,
      ...brandArray,
      ...genderArray,
      ...sortDataArray,
      ...priceArray,
      ...itemArray,
    ]
    let url = urlData.length > 0 ? '/listings/?' + urlData.join('&') : ''
    if (urlData && urlData.length > 0) {
      dispatch(filterData(url))
      replaceUrlData(urlData.join('&'), urlData, 'replace')
    } else {
      replaceUrlData(urlData.join('&'), urlData, 'replace')
    }
  }

  const displayUrl = (
    catNameArray,
    sizeNameArray,
    brandNameArray,
    genderNameArray,
    sortNameArray,
  ) => {
    let filterName = [
      ...catNameArray,
      ...sizeNameArray,
      ...brandNameArray,
      ...genderNameArray,
      ...sortNameArray,
    ]

    setFilterDataUrl(filterName)
  }

  const removeFilter = (item) => {
    if (filterDataUrl.length > 0) {
      let data = filterDataUrl.filter((filterDataUrlitem) => {
        return filterDataUrlitem !== item
      })
      setFilterDataUrl(data)
    }

    // // gender
    let genData = genderNameData.filter((itemData) => {
      return itemData !== item
    })
    setGenderNameData(genData)

    /// uncheck the checkbox
    if (genderSlection.length > 0) {
      genderSlection.map((itemsData) => {
        if (itemsData.name === item && itemsData.value === false) {
          itemsData.value = true
        } else if (itemsData.name === item && itemsData.value === true) {
          itemsData.value = false
        }
      })

      setGenderSelection([...genderSlection])
    }
    /// remove gender ID
    if (genderData.length > 0) {
      let gendNewItem = ''
      if (item.toLowerCase() === 'boys') {
        gendNewItem = 'boy'
      } else if (item.toLowerCase() === 'girls') {
        gendNewItem = 'girl'
      } else {
        gendNewItem = item
          .toLowerCase()
          .substring(item.toLowerCase().indexOf(' ') + 1, item.toLowerCase().length)
      }

      let sortIdFilter1 = genderData.filter((itemData) => {
        let newString = itemData.substring(itemData.indexOf('=') + 1, itemData.length)
        if (newString !== gendNewItem) {
          return itemData
        }
      })

      setGenderData(sortIdFilter1)
      applyFilterData(
        catData,
        sizesData,
        brandsData,
        sortIdFilter1,
        sortData,
        minmaxPrice,
        minmaxItem,
      )
    }

    // remove category ID
    if (catData.length > 0) {
      let newData = []
      options.categories.map((catitem) => {
        if (catitem.name === item) {
          newData.push(catitem.id)
        } else {
          catitem.children.map((citem) => {
            if (citem.name === item) {
              newData.push(citem.id)
            }
          })
        }
      })

      let sortIdFilter4 = catData.filter((itemData) => {
        let newString = itemData.substring(itemData.indexOf('=') + 1, itemData.length)

        if (Number(newString) !== newData[0]) {
          return itemData
        }
      })

      setcatData(sortIdFilter4)
      applyFilterData(
        sortIdFilter4,
        sizesData,
        brandsData,
        genderData,
        sortData,
        minmaxPrice,
        minmaxItem,
      )

      // /// cat
      let catsData = catNameData.filter((itemData) => {
        return itemData !== item
      })

      setCatNameData(catsData)
    }

    // remove brand ID
    if (brandsData.length > 0) {
      let brand = []
      options.brands.map((bitem) => {
        if (bitem.name === item) {
          brand.push(bitem.id)
        }
      })

      let sortIdFilter2 = brandsData.filter((itemData) => {
        let newString = itemData.substring(itemData.indexOf('=') + 1, itemData.length)

        if (Number(newString) !== brand[0]) {
          return itemData
        }
      })

      setBrandData(sortIdFilter2)
      applyFilterData(
        catData,
        sizesData,
        sortIdFilter2,
        genderData,
        sortData,
        minmaxPrice,
        minmaxItem,
      )

      // /// brand
      let brandData = brandsNameData.filter((itemData) => {
        return itemData !== item
      })

      setBrandNameData(brandData)
    }

    if (sizesNameData.length > 0) {
      let sortIdFilter3 = sizesNameData.filter((itemData) => {
        let newString = itemData.substring(itemData.indexOf('=') + 1, itemData.length)
        if (newString !== item) {
          return itemData
        }
      })
      setSizesData(sortIdFilter3)
      applyFilterData(
        catData,
        sortIdFilter3,
        brandsData,
        genderData,
        sortData,
        minmaxPrice,
        minmaxItem,
      )

      // /// size
      let sizeData = sizesNameData.filter((itemData) => {
        return itemData !== item
      })

      setSizesNameData(sizeData)

      /// uncheck the checkbox of size
      if (sizeSelection.length > 0) {
        sizeSelection.map((size) => {
          size.children.map((itemsData) => {
            if (itemsData.name === item && itemsData.value === false) {
              itemsData.value = true
            } else if (itemsData.name === item && itemsData.value === true) {
              itemsData.value = false
            }
          })
        })
        setSizeSelection([...sizeSelection])
      }
    }

    // sort
    if (sortNameData.length > 0) {
      let sortIdFilter4 = sortNameData.filter((itemData) => {
        let newString = itemData.substring(itemData.indexOf('=') + 1, itemData.length)
        if (newString !== item.toLowerCase()) {
          return itemData
        }
      })

      setSizesData(sortIdFilter4)
      applyFilterData(
        catData,
        sizesData,
        brandsData,
        genderData,
        sortIdFilter4,
        minmaxPrice,
        minmaxItem,
      )

      let sortByData = sortNameData.filter((itemData) => {
        return itemData !== item
      })

      setBrandNameData(sortByData)
    }
  }

  return (
    <div>
      <GoogleTap />
      <div className="shop">
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="row align-items-center mb-4 pb-1">
                  <div className="col-12">
                    <div className="product_header">
                      <div className="product_header_left"></div>
                      <div className="product_header_right">
                        <div className="custom_select">
                          <div style={{ width: 200 }}>
                            <Select
                              value={selectedOption}
                              placeholder="Sort By"
                              onChange={sortIdData}
                              isMulti={false}
                              options={sortArray}
                              isSearchable={false}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row shop_container">
                  {/* {shop.map((item) => (
					<div className="col-12">
						<ListingRow listing={item} />
					</div>
					))} */}
                  <FlatList
                    list={shop}
                    renderItem={(item, index) => {
                      return (
                        <div key={index}>
                          <ListingRow listing={item} />
                        </div>
                      )
                    }}
                    renderWhenEmpty={() => <div></div>}
                  />
                </div>
                {hasMoreListings && <Loader active size="tiny" inline="centered" />}
                {/* <div>
					{shopsData && shopsData.count && (
					<Pagination
						activePage={1}
						itemsCountPerPage={25}
						totalItemsCount={shopsData.count}
						pageRangeDisplayed={25}
						onChange={onChangePagination}
					/>
					)}
				</div> */}
              </div>

              <div className="col-lg-3 order-lg-first mt-4 pt-2 mt-lg-0 pt-lg-0">
                <div className="sidebar">
                  {filterDataUrl.length > 0 && (
                    <div className="row">
                      <div className="col-lg-9">
                        <div className="row align-items-center mb-4 pb-1">
                          <div>
                            <div className="filter_tags">
                              {filterDataUrl.map((item) => (
                                <div className="filter_label">
                                  <Label size={'small'} as="a">
                                    {item}
                                    <Icon
                                      name="delete"
                                      onClick={() => {
                                        removeFilter(item)
                                      }}
                                    />
                                  </Label>
                                </div>
                              ))}
                            </div>
                            <div style={{ padding: 12 }}>
                              <Button
                                size="mini"
                                color="violet"
                                inverted
                                compact
                                onClick={() => {
                                  replaceUrlData('', '')
                                }}
                              >
                                Clear All
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="widget">
                    <h5 className="widget_title">Gender</h5>
                    <div className="product_size_switch">
                      <ul className="list_brand">
                        {genderSlection.map((item, index) => (
                          <li key={index}>
                            <div className="custome-checkbox">
                              <Checkbox
                                checked={item.value}
                                label={{ children: item.name }}
                                onClick={() => {
                                  genderIdData(item.id, item.name)

                                  genderSlection.map((itemsData) => {
                                    if (itemsData.id === item.id && itemsData.value === false) {
                                      itemsData.value = true
                                    } else if (
                                      itemsData.id === item.id &&
                                      itemsData.value === true
                                    ) {
                                      itemsData.value = false
                                    }
                                  })
                                  setGenderSelection([...genderSlection])
                                }}
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="widget">
                    <h5 className="widget_title">Size</h5>
                    <div>
                      <ul className="list_brand">
                        {sizeSelection.map((items) => (
                          <>
                            <div>
                              {items.children.map((item) => (
                                <>
                                  <Button
                                    size="mini"
                                    toggle
                                    active={item.value}
                                    style={{ margin: '2px' }}
                                    onClick={() => {
                                      sizeIdData(item.id, item.name)

                                      sizeSelection.map((size) => {
                                        size.children.map((itemsData) => {
                                          if (
                                            itemsData.id === item.id &&
                                            itemsData.value === false
                                          ) {
                                            itemsData.value = true
                                          } else if (
                                            itemsData.id === item.id &&
                                            itemsData.value === true
                                          ) {
                                            itemsData.value = false
                                          }
                                        })
                                        setSizeSelection([...sizeSelection])
                                      })
                                    }}
                                  >
                                    {item.name}
                                  </Button>
                                </>
                              ))}
                            </div>
                          </>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="widget">
                    <h5 className="widget_title">Category</h5>
                    <TreeView
                      sx={{
                        flexGrow: 1,
                        maxWidth: 400,
                      }}
                      defaultCollapseIcon={<ExpandMoreIcon />}
                      defaultExpandIcon={<ChevronRightIcon />}
                    >
                      {categoryArray.map((items) => (
                        <TreeItem
                          key={items.id.toString()}
                          nodeId={items.id.toString()}
                          label={items.name}
                          onClick={() => cateIdData(items.id, items.name)}
                        >
                          {items.children.map((childItem) => (
                            <TreeItem
                              key={childItem.id.toString()}
                              nodeId={childItem.id.toString()}
                              label={childItem.name}
                              onClick={() => cateIdData(childItem.id, childItem.name)}
                            />
                          ))}
                        </TreeItem>
                      ))}
                    </TreeView>
                  </div>
                  <div className="widget">
                    <h5 className="widget_title">Brand</h5>
                    <Select
                      value={selectedOption}
                      placeholder="Select Brands"
                      onChange={brandIdData}
                      isMulti
                      options={brandsArray}
                    />
                  </div>

                  <div className="widget">
                    <h5 className="widget_title">Number of Items</h5>
                    <div className="filter_price">
                      <div className="filter_price" style={{ marginTop: 15 }}>
                        <div className="price_range">
                          <div className="btn-login list_none text-center">
                            <li style={{ width: '27.79%' }}>
                              <div className="ui focus input">
                                <input
                                  type="text"
                                  placeholder="Min"
                                  onChange={(item) => setMinItem(item.target.value)}
                                  style={{
                                    marginLeft: -15,
                                    borderRadius: 5,
                                    width: '100%',
                                    padding: 8,
                                  }}
                                />
                              </div>
                            </li>
                            <li style={{ width: '27.79%' }}>
                              <div className="ui focus input">
                                <input
                                  type="text"
                                  placeholder="Max"
                                  onChange={(item) => setMaxItem(item.target.value)}
                                  style={{
                                    marginLeft: -15,
                                    borderRadius: 5,
                                    width: '100%',
                                    padding: 8,
                                  }}
                                />
                              </div>
                            </li>
                            <li style={{ width: '27.79%' }}>
                              <div className="ui focus input">
                                <ul className="add-to-cart">
                                  <Button
                                    inverted
                                    color="violet"
                                    onClick={() => {
                                      minmaxitem()
                                    }}
                                  >
                                    Apply
                                  </Button>
                                </ul>
                              </div>
                            </li>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="widget">
                    <h5 className="widget_title">Price</h5>
                    <div className="filter_price">
                      <div className="price_range">
                        <div className="btn-login list_none text-center">
                          <li style={{ width: '27.79%' }}>
                            <div className="ui focus input">
                              <input
                                type="text"
                                placeholder="Min"
                                onChange={(item) => setMinPrice(item.target.value)}
                                style={{
                                  marginLeft: -15,
                                  borderRadius: 5,
                                  width: '100%',
                                  padding: 8,
                                }}
                              />
                            </div>
                          </li>
                          <li style={{ width: '27.79%' }}>
                            <div className="ui focus input">
                              <input
                                type="text"
                                placeholder="Max"
                                onChange={(item) => setMaxPrice(item.target.value)}
                                style={{
                                  marginLeft: -15,
                                  borderRadius: 5,
                                  width: '100%',
                                  padding: 8,
                                }}
                              />
                            </div>
                          </li>
                          <li style={{ width: '27.79%' }}>
                            <div className="ui focus input">
                              <ul className="add-to-cart">
                                <Button
                                  inverted
                                  color="violet"
                                  onClick={() => {
                                    minmaxprice()
                                  }}
                                >
                                  Apply
                                </Button>
                              </ul>
                            </div>
                          </li>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
