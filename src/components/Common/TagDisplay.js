import { Component } from 'react'
import { Label } from 'semantic-ui-react'

class TagDisplay extends Component {
  render() {
    // const id = this.props.id;
    const items = this.props.items
    const options = this.props.options

    let sizes = []
    let brands = []
    let categories = []

    for (var i = 0; i < items.length; i++) {
      if (items[i].size) {
        if (items[i].size.name) {
          sizes[items[i].size.name] = 1 + (sizes[items[i].size.name] || 0)
        } else {
          let newSize = []
          if (options) {
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            options.sizes.forEach((item) => {
              item.children.forEach((fitem) => {
                if (fitem.id === items[i].size) {
                  newSize.push(fitem)
                }
              })
            })
            sizes[newSize[0].name] = 1 + (sizes[items[i].size.name] || 0)
          }
        }
      }
      if (items[i].category) {
        if (items[i].category.name) {
          categories[items[i].category.name] = 1 + (categories[items[i].category.name] || 0)
        } else {
          if (options) {
            let filterCategory = []
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            options.categories.map((category_item) => {
              if (category_item.id === items[i].category) {
                filterCategory.push(category_item)
              } else {
                category_item.children.map((children_item) => {
                  if (children_item.id === items[i].category) {
                    filterCategory.push(children_item)
                  }
                })
              }
            })
            categories[filterCategory[0].name] = 1 + (categories[items[i].category.name] || 0)
          }
        }
      }
      if (items[i].brand) {
        if (items[i].brand.name) {
          brands[items[i].brand.name] = 1 + (brands[items[i].brand.name] || 0)
        } else {
          if (options) {
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            let filterBrand = options.brands.filter((item) => {
              return item.id === items[i].brand
            })

            brands[filterBrand[0].name] = 1 + (brands[items[i].brand.name] || 0)
          }
        }
      }
    }

    const sizesOrdered = Object.keys(sizes).sort(function (a, b) {
      return sizes[b] - sizes[a]
    })
    const categoriesOrdered = Object.keys(categories).sort(function (a, b) {
      return categories[b] - categories[a]
    })
    const brandsOrdered = Object.keys(brands).sort(function (a, b) {
      return brands[b] - brands[a]
    })

    let tags = sizesOrdered.map((tag, index) => (
      <Label color={'pink'} key={tag}>
        {tag}
        {sizes[sizesOrdered[index]] > 1 && (
          <Label.Detail style={{ color: 'purple' }}>{sizes[sizesOrdered[index]]}</Label.Detail>
        )}
      </Label>
    ))

    tags.push.apply(
      tags,
      categoriesOrdered.map((tag, index) => (
        <Label color={'orange'} key={tag}>
          {tag}
          {categories[categoriesOrdered[index]] > 1 && (
            <Label.Detail style={{ color: 'purple' }}>
              {categories[categoriesOrdered[index]]}
            </Label.Detail>
          )}
        </Label>
      )),
    )

    tags.push.apply(
      tags,
      brandsOrdered.map((tag, index) => (
        <Label color={'teal'} key={tag}>
          {tag}
          {brands[brandsOrdered[index]] > 1 && (
            <Label.Detail style={{ color: 'purple' }}>{brands[brandsOrdered[index]]}</Label.Detail>
          )}
        </Label>
      )),
    )

    return <div>{tags}</div>
  }
}

export default TagDisplay
