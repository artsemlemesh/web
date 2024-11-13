// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global google */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Segment, Button, Header, Label, Icon } from 'semantic-ui-react'
import TagDisplay from '../Common/TagDisplay'
import { addItemToCart, updateLocalCart } from '../../store/actions/product'
import { getItem, setItem } from '../../helpers/storage'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ResponsiveGallery from 'react-responsive-gallery'

function ListingRow(listing) {
  // const options = useSelector((state) => state.shop.options)
  // const localCartData = useSelector((state) => state.cart.localCart)
  // const dispatch = useDispatch()

  // const reload = getItem('reload')
  // const [length] = useState(12)
  // const [start, setStart] = useState(0)
  // const [end, setEnd] = useState(12)

  // const photos = listing.listing.items.map(function (item) {
  //   const firstImage = item.images[0]
  //   return { src: firstImage?.image_small, width: 1, height: 1 }
  // })

  // const onAddCart = (item) => {
  //   const token = getItem('token')
  //   // let localCartData = getItem("localCartData");
  //   if (token) {
  //     let req = {
  //       data: item,
  //     }
  //     dispatch(addItemToCart(req))
  //   } else {
  //     if (localCartData && localCartData !== null) {
  //       let newArray = JSON.parse(localCartData)
  //       if (newArray && newArray !== null) {
  //         let index = newArray.findIndex((citem) => citem.listing.id === item.listing.id)
  //         if (index === -1) {
  //           newArray.push(item)
  //           // setItem("localCartData", JSON.stringify(newArray));
  //           dispatch(updateLocalCart(newArray))
  //         }
  //       }
  //     } else {
  //       let newArray = []
  //       newArray.push(item)
  //       // setItem("localCartData", JSON.stringify(newArray));
  //       dispatch(updateLocalCart(newArray))
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (reload === 'true') {
  //     window.location = window.location.href
  //     setItem('reload', false)
  //   }
  // }, [reload])

  // let localData = []
  // if (photos.length > 0) {
  //   photos.slice([start], [end]).map((item) => {
  //     let data = { width: 1, height: 1, src: item.src }
  //     localData.push(data)
  //   })
  // }

  return (
    <h1>hello</h1>

  //   <Container fluid style={{ marginBottom: 15 }}>
  //     <Segment.Group>
  //       <Segment padded>
  //         <Header as="h4">
  //           <Link to={`/listing/${listing.listing.id}/${listing.listing.slug}`}>
  //             {listing.listing.title}
  //           </Link>
  //         </Header>
  //         <div>
  //           {/* <Gallery photos={localData} height={50} columns={4} />
  //            */}
  //           <Link to={`/listing/${listing.listing.id}/${listing.listing.slug}`}>
  //             <ResponsiveGallery
  //               images={localData}
  //               imageMaxWidth={500}
  //               numOfImagesPerRow={{ xxl: 4, l: 4, m: 3, s: 3, xs: 3 }}
  //               colsPadding={{ xxl: 10, xl: 0 }}
  //               useLightBox={false}
  //             />
  //           </Link>
  //           {/* <div>
	// 							<span>{}</span>
	// 						</div> */}
  //         </div>

  //         {photos.length >= length && (
  //           <div style={{ padding: 5, marginBottom: 20 }}>
  //             <div style={{ float: 'right' }}>
  //               <Button
  //                 icon
  //                 size="large"
  //                 onClick={() => {
  //                   if (localData.length >= 12) {
  //                     setStart(start + length)
  //                     setEnd(end + length)
  //                   }
  //                 }}
  //               >
  //                 Next
  //               </Button>
  //             </div>
  //             <div style={{ float: 'left' }}>
  //               <Button
  //                 icon
  //                 size="large"
  //                 onClick={() => {
  //                   if (start !== 0 && end !== length) {
  //                     setStart(start - length)
  //                     setEnd(end - length)
  //                   }
  //                 }}
  //               >
  //                 Previous
  //               </Button>
  //             </div>
  //           </div>
  //         )}
  //       </Segment>

  //       <Segment>
  //         <div key={listing.listing.id}>
  //           <TagDisplay id={listing.listing.id} items={listing.listing.items} options={options} />
  //         </div>
  //       </Segment>

  //       <Segment>
  //         <div>
  //           {/* <a href="/shop"> */}
  //           <Button
  //             icon
  //             size="large"
  //             color="violet"
  //             labelPosition="left"
  //             onClick={() => onAddCart(listing)}
  //           >
  //             <Icon name="shop" />
  //             Add To Cart
  //           </Button>
  //           {/* </a> */}
  //         </div>
  //         <Label color="violet" attached="bottom right" size={'large'}>
  //           ${parseFloat(listing.listing.buyer_price).toFixed(2)}
  //         </Label>
  //       </Segment>
  //     </Segment.Group>
  //   </Container>
  )
}

export default ListingRow
