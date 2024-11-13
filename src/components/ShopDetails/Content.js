import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Thumbnail from './Thumbnail'
import { Button, Icon } from 'semantic-ui-react'
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterShareButton,
  TwitterIcon,
  EmailIcon,
  EmailShareButton,
} from 'react-share'
import { isMobile } from 'react-device-detect'
import TagDisplay from '../Common/TagDisplay'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { getItem } from '../../helpers/storage'
import { addItemToCart, updateLocalCart } from '../../store/actions/product'
import Config from '../../config'
import ImageList from './ImageList'

function Content() {
  const shop = useSelector((state) => state.shop.shops)
  const dispatch = useDispatch()
  const options = useSelector((state) => state.shop.options)
  const { id } = useParams()
  const localCartData = useSelector((state) => state.cart.localCart)

  const filterData = shop.filter((item) => item.id == id)
  const items = filterData.length > 0 ? filterData[0].items : []

  useEffect(() => {
    if (isMobile) window.location = `${Config.base_scheme}?id=${id}`
  }, [])

  const onAddCart = () => {
    const token = getItem('token')
    const item = { listing: filterData[0] }

    if (token) {
      const req = {
        data: item,
      }
      dispatch(addItemToCart(req))
    } else {
      let newArray = localCartData ? JSON.parse(localCartData) : []

      if (newArray && newArray !== null) {
        const index = newArray.findIndex((citem) => citem.listing.id === item.listing.id)
        if (index === -1) {
          newArray.push(item)
          dispatch(updateLocalCart(newArray))
        }
      } else {
        newArray = [item]
        dispatch(updateLocalCart(newArray))
      }
    }
  }

  const [selectedItem, setSelectedItem] = useState(items[0])

  useEffect(() => {
    setSelectedItem(items[0])
    return () => {
      setSelectedItem(items[0])
    }
  }, [items])

  const [key, setKey] = useState(1)

  function handleSelect(item) {
    setSelectedItem(item)
    setKey((prevKey) => prevKey + 1)
  }

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div class="flex-col col-lg-6 col-md-6 mb-4 mb-md-0">
            <ImageList selectedItem={selectedItem} key={key} />
            <Thumbnail items={items} handleSelect={handleSelect} />
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="pr_detail">
              <div class="product_description">
                <h3 class="product_title">
                  {filterData && filterData.length > 0 ? filterData[0].title : null}
                </h3>

                <div class="product_price_desc d-flex flex-row justify-content-between">
                  <div class="pr_desc">
                    <p class="fs-1">
                      {filterData.length > 0 && filterData[0].description
                        ? filterData[0].description
                        : 'Description not available.'}
                    </p>
                    <TagDisplay items={items} options={options} />
                  </div>
                </div>
                <div class="d-flex flex-justify-between align-items-center mt-3">
                  {/* <a href={window.location}> */}
                  <Button
                    icon
                    size="large"
                    color="violet"
                    labelPosition="left"
                    onClick={() => onAddCart()}
                  >
                    <Icon name="shop" />
                    Add to Cart
                  </Button>
                  {/* </a> */}

                  <div class="ml-3">
                    {/* <span class="price">
                      $
                      {filterData && filterData.length > 0
                        ? parseFloat(filterData[0].buyer_price).toFixed(2)
                        : null}
                    </span> */}
                  </div>

                  {/* <del>$55.25</del>
									<div class='on_sale'>
										<span>35% Off</span>
									</div> */}
                </div>
              </div>
              <hr />

              <div class="product_share">
                <div class="d-flex flex-justify-between flex nh">
                  <div>
                    <span>WHO WOULD LIKE THIS?&nbsp;&nbsp;&nbsp;</span>{' '}
                  </div>
                  <div class="ml-3">
                    <EmailShareButton
                      url={`${Config.base_scheme}?id=${id}`}
                      quote={'Open your page in the App'}
                      hashtag="#bundleup"
                    >
                      <EmailIcon size={36} />
                    </EmailShareButton>
                    <TwitterShareButton
                      url={`${Config.base_scheme}?id=${id}`}
                      quote={'Open your page in the App'}
                      hashtag="#bundleup"
                    >
                      <TwitterIcon size={36} />
                    </TwitterShareButton>
                    <FacebookShareButton
                      url={`${Config.base_scheme}?id=${id}`}
                      quote={'Open your page in the App'}
                      hashtag="#bundleup"
                    >
                      <FacebookIcon size={36} />
                    </FacebookShareButton>
                    <WhatsappShareButton
                      url={`${Config.base_scheme}?id=${id}`}
                      quote={'Open your page in the App'}
                      hashtag="#bundleup"
                    >
                      <WhatsappIcon size={36} />
                    </WhatsappShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="large_divider clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
