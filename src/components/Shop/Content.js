/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Label, Icon, Checkbox, Loader } from 'semantic-ui-react'
import Select from 'react-select'
import queryString from 'query-string'
import { TreeView, TreeItem } from '@mui/x-tree-view'
import { Grid } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { getItem, setItem } from '../../helpers/storage'
import { getUrl, loadItemOptions, getShopList } from '../../store/actions/shop'
import ListingRow from './ListingRow'
import GoogleTap from '../Common/GoogleTap'
import consoleHelper from '../../helpers/ConsoleHelper'
import Product from './Product'
// new

function Content() {
  const shop = useSelector((state) => state.shop.shops)
  const dispatch = useDispatch()
  const options = useSelector((state) => state.shop.options)

  // holds the values for each of the filters
  const [filterData, setFilterData] = useState({})
  const [filterTag, setFilterTags] = useState({})

  const updateFilterData = (updatedObj) => {
    // one key updated at a time. replace with updatedObj
    const key = Object.keys(updatedObj)[0]
    if (key === 'min_items') {
      filterData[key] = [`> ${updatedObj[key]} items`]
    } else if (key === 'max_items') {
      filterData[key] = [`< ${updatedObj[key]} items`]
    } else if (key === 'min_price') {
      filterData[key] = [`> $${updatedObj[key]}`]
    } else if (key === 'max_price') {
      filterData[key] = [`< $${updatedObj[key]}`]
    } else {
      filterData[key] = updatedObj[key]
    }
    filterTagData()
    setFilterData(filterData)
  }

  useEffect(() => {
    dispatch(loadItemOptions())
  }, [])

  //delete later
  useEffect(() => {
    console.log('SHOP', shop)
  }, [shop])

  useEffect(() => {
    loadInitialData()
    updateComponentData()
  }, [options])

  const loadInitialData = () => {
    let newSize = []
    let shoes = []
    let sizeData = []
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

        sizeData.push(obje)
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

    setSizeSelection(sizeData)
    setCommonSize(sizeData)
    setShoesSize(shoesData)
  }

  const filterTagData = () => {
    let filterTags = []
    for (const [key, value] of Object.entries(filterData)) {
      value?.forEach((id) => {
        filterTags.push({ key: key, value: convertIdToLabel(key, id), id: id })
      })
    }
    setFilterTags(filterTags)
  }

  const updateComponentData = () => {
    let filter
    for (filter in filterData) {
      switch (filter) {
        case 'items__gender':
          const updatedGender = gender.map((x) => {
            x.value = filterData[filter].includes(x.id)
            return x
          })
          setGenderSelection(updatedGender)
          break
        case 'items__size':
          if (options?.sizes?.length > 0) {
            let newArray = [...options.sizes]
            newArray.map((e) => {
              e.children.map((x) => {
                x.value = filterData[filter].includes(x.id.toString())
              })
            })
            setSizeSelection([...newArray])
          }
        default:
          break
      }
    }
  }

  const parseUrl = () => {
    // Parse (?items__gender=boy&items__gender=girl&items__foo=bar)
    // => {items__foo: "bar", items__gender: ["boy", "girl"]}
    let parsed = queryString.parse(window.location.search)
    callFilterApi(parsed)
    // Convert all single values to arrays to support same key in url
    // => {items__foo: ["bar"], items__gender: ["boy", "girl"]}
    let key
    for (key in parsed) {
      parsed[key] = [].concat(parsed[key])
    }
    filterTagData()
    setFilterData(parsed)
  }

  const buildUrl = (filterDataVal) => {
    let stringified = queryString.stringify(filterData)

    let normalUrl = '/shop'
    const replaceUrl = filterDataVal ? normalUrl : '/shop' + `?${stringified}`
    window.history.pushState('', '', replaceUrl === '/shop?' ? normalUrl : replaceUrl)
    stringified = decodeURIComponent(stringified)
    stringified = stringified.replace('< $', '')
    stringified = stringified.replace('> $', '')
    stringified = stringified.replace('< ', '')
    stringified = stringified.replace(' items', '')
    stringified = stringified.replace('> ', '')
    stringified = stringified.replace(' items', '')
    consoleHelper('stringified', stringified)
    applyFilterData(stringified, filterDataVal)
  }

  useEffect(() => {
    parseUrl()
  }, [])

  useEffect(() => {
    updateComponentData()
  }, [filterData])

  const handleRemoveTag = (item) => {
    filterData[item.key] = filterData[item.key].filter((x) => {
      return x != item.id
    })

    buildUrl()

    let gender = [...genderSelection]
    const genderIndex = gender.findIndex((element) => element.name == item.value)
    if (genderIndex !== -1) {
      gender[genderIndex] = {
        ...gender[genderIndex],
        value: !gender[genderIndex].value,
      }
    }
    setGenderSelection(gender)

    sizeSelection.map((size) => {
      size.children.map((itemsData) => {
        if (itemsData.name === item.value && itemsData.value === false) {
          itemsData.value = true
        } else if (itemsData.name === item.value && itemsData.value === true) {
          itemsData.value = false
        }
      })
    })
    setSizeSelection([...sizeSelection])

    filterTagData()
    setFilterData(filterData)
    buildFilterTags(filterData)
  }

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

  const handleGenderSelection = (item) => {
    let selectedGenders = []
    const updatedGender = genderSelection.map((x) => {
      if (x.id === item.id) {
        x.value = !item.value
      }
      if (x.value === true) {
        selectedGenders.push(x.id)
      }
      return x
    })
    setGenderSelection(updatedGender)
    updateFilterData({ items__gender: selectedGenders })
    buildUrl()
  }

  const handleSizeSelection = (item) => {
    sizeIdData(item.id, item.name)
    let selectedSizes = []
    sizeSelection.map((size) => {
      size.children.map((x) => {
        if (x.id === item.id) {
          x.value = !item.value
        }
        if (x.value === true) {
          selectedSizes.push(x.id)
        }
      })
      setSizeSelection([...sizeSelection])
    })
    updateFilterData({ items__size: selectedSizes })
    buildUrl()
  }

  const handleCategorySelection = (item, name) => {
    let selectedCategories = []
    let categoryFilterId = []
    let categoryFilterName = []
    if (options && options.categories) {
      categoryFilterId.push(`items__category=${item}`)
      selectedCategories.push(item)
      categoryFilterName.push(name)
      options.categories.map((catItem) => {
        if (catItem.id === item) {
          catItem.children.map((children) => {
            categoryFilterId.push(`items__category=${children.id}`)
            categoryFilterName.push(children.name)
            selectedCategories.push(children.id)
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
    updateFilterData({ items__category: selectedCategories })
    buildUrl()
  }

  const handlebrandSelection = (selectedOption) => {
    if (selectedOption && selectedOption.length > 0) {
      let brandId = selectedOption.map((item) => {
        return item.length > 0 ? [] : item.value
      })

      let brandName = selectedOption.map((item) => {
        return item.label
      })

      setBrandData(brandId)
      setBrandNameData(brandName)
      updateFilterData({ items__brand: brandId })
      buildUrl()
    }
  }

  const [genderSelection, setGenderSelection] = useState(gender)
  const [sizeSelection, setSizeSelection] = useState([])
  const [selectedOption] = useState()
  const [maxPrice, setMaxPrice] = useState([])
  const [minPrice, setMinPrice] = useState([])
  const [maxItem, setMaxItem] = useState([])
  const [minItem, setMinItem] = useState([])
  const [, setcatData] = useState([])
  const [, setBrandData] = useState([])
  const [sizesData, setSizesData] = useState([])
  const [commonSize, setCommonSize] = useState([])
  const [shoesSize, setShoesSize] = useState([])
  const [, setCatNameData] = useState([])
  const [, setBrandNameData] = useState([])
  const [sizesNameData, setSizesNameData] = useState([])
  const [, setFilterDataUrl] = useState([])
  const [hasMoreListings, setHasMoreListings] = useState(false)
  const [filterLoading, setFilterLoading] = useState(false)
  const [shopLoading, setShopLoading] = useState(false)
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

  let brandIdToName = {}
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
        brandIdToName[items.id] = items.name
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
    setItem('isLoading', 'true')
    setShopLoading(true)
    const obj = {
      onSuccess: () => {
        setItem('isLoading', 'false')
        setShopLoading(false)
      },
      onFail: () => {
        setItem('isLoading', 'false')
        setShopLoading(false)
      },
    }
    let parsed = queryString.parse(window.location.search)
    if (Object.keys(parsed).length === 0) {
      dispatch(getShopList(obj))
    }
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
      setShopLoading(true)
      let obj = {
        url: nextUrl,
        onSuccess: () => {
          setItem('isLoading', 'false')
          setShopLoading(false)
        },
        onFail: () => {
          setItem('isLoading', 'false')
          setShopLoading(false)
        },
      }
      setHasMoreListings(true)
      dispatch(getShopList(obj))
    } else if (nextUrl == 'null') {
      setHasMoreListings(false)
    }
  }

  const handleSortBySelection = (Option) => {
    const opts = [Option]
    if (opts?.length > 0) {
      let sortId = opts.map((item) => {
        return item.length > 0 ? [] : item.value
      })
      updateFilterData({ ordering: sortId })
      buildUrl()
    }
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
        let sizeUnselectedItem = sizesData.filter((size) => {
          return size !== `items__size=${item}`
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
  }

  const minmaxprice = () => {
    if (minPrice > 0) {
      updateFilterData({ min_price: [minPrice] })
    }
    if (maxPrice > 0) {
      updateFilterData({ max_price: [maxPrice] })
    }
    buildUrl()
  }
  const minmaxitem = () => {
    if (minItem > 0) {
      updateFilterData({ min_items: [minItem] })
    }
    if (maxItem > 0) {
      updateFilterData({ max_items: [maxItem] })
    }
    buildUrl()
  }

  const applyFilterData = (urlData, filterDataVal) => {
    setFilterLoading(true)
    let url = urlData ? '/products/?' + urlData : ''
    if (filterDataVal) {
      url = '/products/'
    }
    let obj = {
      url: url,
      onSuccess: () => {
        setFilterLoading(false)
      },
      onFail: () => {
        setFilterLoading(false)
      },
    }
    dispatch(getUrl(obj))
  }

  const callFilterApi = (parsed) => {
    if (Object.keys(parsed).length > 0) {
      let url = ''
      Object.keys(parsed).map((item) => {
        if (Array.isArray(parsed[item])) {
          parsed[item].map((subitem) => {
            url = url + '&' + item + '=' + subitem
          })
        } else {
          url = url + '&' + item + '=' + parsed[item]
        }
      })
      if (url && url.length > 1) {
        url = url.substr(1, url.length)
        url = '/products/?' + url
        setFilterLoading(true)

        url = url.replace('< $', '')
        url = url.replace('> $', '')
        url = url.replace('< ', '')
        url = url.replace(' items', '')
        url = url.replace('> ', '')
        url = url.replace(' items', '')

        let obj = {
          url: url,
          onSuccess: () => {
            setFilterLoading(false)
            setShopLoading(false)
          },
          onFail: () => {
            setFilterLoading(false)
            setShopLoading(false)
          },
        }
        dispatch(getUrl(obj))
      }
    }
  }

  const convertIdToLabel = (key, id) => {
    switch (key) {
      case 'items__gender':
        let index = gender.findIndex((item) => item.id === id)
        if (index !== -1) {
          return gender[index].name
        }
      case 'items__size':
        if (options && options.sizes && options.sizes.length > 0) {
          let sizeName = id

          options.sizes.map((e) => {
            if (e.id === id) {
              sizeName = e.name
            } else {
              e.children.map((x) => {
                if (parseInt(x.id) === parseInt(id)) {
                  sizeName = x.name
                }
              })
            }
          })
          return sizeName
        }
        return id
      case 'items__category':
        if (options && options.categories && options.categories.length > 0) {
          let categoryName = id
          options.categories.map((e) => {
            if (e.id.toString() === id.toString()) {
              categoryName = e.name
            }
            e.children.map((x) => {
              if (x.id.toString() === id.toString()) {
                categoryName = x.name
              }
            })
          })
          return categoryName
        }
        return id
      default:
        return id
    }
  }

  const onClearAll = () => {
    sizeSelection.map((size) => {
      size.children.map((itemsData) => {
        if (itemsData.value === true) {
          itemsData.value = false
        }
      })
    })

    setGenderSelection(gender)
    setSizeSelection([...sizeSelection])
    setFilterTags([])
    setFilterData([])
    setFilterDataUrl([])
    setMinPrice(null)
    setMaxPrice(null)
    buildUrl([])
    setMinItem(null)
    setMaxItem(null)
  }

  const buildFilterTags = () => {
    let filter = []
    if (filterTag.length === 0) {
      let filterTags = []
      for (const [key, value] of Object.entries(filterData)) {
        value?.forEach((id) => {
          filterTags.push({ key: key, value: convertIdToLabel(key, id), id: id })
        })
      }
      filter = filterTags
    } else {
      filter = filterTag
    }
    return (
      filter.length > 0 && (
        <div className="row">
          <div className="col-lg-9">
            <div className="row align-items-center mb-4 pb-1">
              <div>
                <div className="filter_tags">
                  {filter.map((item) => (
                    <div className="filter_label">
                      <Label size={'small'} as="a">
                        {item.key == 'items__brand' ? brandIdToName[item.id] : item.id}
                        <Icon
                          name="delete"
                          onClick={() => {
                            handleRemoveTag(item)
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
                      onClearAll()
                    }}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    )
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
                              onChange={handleSortBySelection}
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
                <div
                  className="row shop_container"
                  style={{ marginBottom: 15, alignItems: 'center', marginLeft: -150 }}
                >
                  {(shopLoading || filterLoading) && (
                    <Loader active size="tiny" inline="centered" />
                  )}
                </div>
                <div className="row shop_container">
                  <Grid container spacing={3}>
                    {shop.map((component) => (
                      <Grid  item xs={12} sm={12} md={6} key={component.id}>
                         <Product  product={component} />
                        </Grid>
                    ))}
                  </Grid>
                </div>
                {hasMoreListings && <Loader active size="tiny" inline="centered" />}
              </div>

              <div className="col-lg-3 order-lg-first mt-4 pt-2 mt-lg-0 pt-lg-0">
                <div className="sidebar">
                  {buildFilterTags()}
                  <div className="widget">
                    <h5 className="widget_title">Gender</h5>
                    <div className="product_size_switch">
                      <ul className="list_brand">
                        {genderSelection.map((item, index) => (
                          <li key={index}>
                            <div className="custome-checkbox">
                              <Checkbox
                                checked={item.value}
                                label={{ children: item.name }}
                                onClick={() => handleGenderSelection(item)}
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
                                    onClick={() => handleSizeSelection(item)}
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
                          onClick={() => handleCategorySelection(items.id, items.name)}
                        >
                          {items.children.map((childItem) => (
                            <TreeItem
                              key={childItem.id.toString()}
                              nodeId={childItem.id.toString()}
                              label={childItem.name}
                              onClick={() => handleCategorySelection(childItem.id, childItem.name)}
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
                      onChange={handlebrandSelection}
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
                                  value={minItem}
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
                                  value={maxItem}
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
                                value={minPrice}
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
                                value={maxPrice}
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
