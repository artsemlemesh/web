import { Link } from 'react-router-dom'

function HeaderMenu() {
  return (
    <ul className="navbar-nav">
      <li className="dropdown dropdown-mega-menu">
        <Link className="dropdown-toggle nav-link" to="#" data-toggle="dropdown">
          Baby Girl
        </Link>
        <div className="dropdown-menu">
          <ul className="mega-menu d-lg-flex">
            <li className="mega-menu-col col-lg-3">
              <ul>
                <li className="dropdown-header">Categories</li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=7&items__category=8&items__category=9&items__category=10&items__gender=girl&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Tops & Tees
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=1&items__category=2&items__category=87&items__category=88&items__category=89&items__category=4&items__category=6&items__category=3&items__gender=girl&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    One Pieces & Bodysuits
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=11&items__category=16&items__category=14&items__category=12&items__category=13&items__gender=girl&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Pants & Leggings
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=17&items__category=19&items__category=18&items__category=20&items__gender=girl&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Shorts & Skirts
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=30&items__category=76&items__category=77&items__category=78&items__category=81&items__category=82&items__category=83&items__category=84&items__category=80&items__category=79&items__gender=girl&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Dresses
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=21&items__category=91&items__category=25&items__category=23&items__category=24&items__category=22&items__category=90&items__category=26&items__category=29&items__gender=girl&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Pajamas & Sleepwear
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=21&items__category=91&items__category=25&items__category=23&items__category=24&items__category=22&items__category=90&items__category=26&items__category=29&items__gender=girl&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Jackets & Outerwear
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mega-menu-col col-lg-3">
              <ul>
                <li className="dropdown-header">&nbsp;</li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=38&items__category=39&items__category=40&items__category=41&items__category=42&items__gender=girl&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Sweaters & Hoodies
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=50&items__category=54&items__category=55&items__category=52&items__category=51&items__category=53&items__category=56&items__gender=girl&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Swimwear
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=57&items__category=60&items__category=92&items__category=58&items__category=62&items__category=61&items__gender=girl&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Undergarments
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=63&items__category=65&items__category=75&items__category=72&items__category=74&items__category=64&items__category=66&items__category=73&items__category=69&items__category=68&items__category=70&items__gender=girl&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Accessories & more
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=94&items__category=95&items__gender=girl&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Shoes
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-bold nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    View All »
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mega-menu-col col-lg-3">
              <ul>
                <li className="dropdown-header">Sizes</li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=8"
                  >
                    Preemie
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=1"
                  >
                    Newborn
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=2"
                  >
                    3M (0-3 months)
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=3"
                  >
                    6M (3-6 months)
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mega-menu-col col-lg-3">
              <ul>
                <li className="dropdown-header">&nbsp;</li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=4"
                  >
                    9M (6-9 months)
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=5"
                  >
                    12M (9-12 months)
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=6"
                  >
                    18M (12-18 months)
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=9"
                  >
                    24M (18-24 months)
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-bold nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    View All »
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </li>
      <li className="dropdown dropdown-mega-menu">
        <Link className="dropdown-toggle nav-link" to="#" data-toggle="dropdown">
          Baby Boy
        </Link>
        <div className="dropdown-menu">
          <ul className="mega-menu d-lg-flex">
            <li className="mega-menu-col col-lg-3">
              <ul>
                <li className="dropdown-header">Categories</li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=7&items__category=8&items__category=9&items__category=10&items__gender=boy&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Tops & Tees
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=1&items__category=2&items__category=87&items__category=88&items__category=89&items__category=4&items__category=6&items__category=3&items__gender=boy&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    One Pieces & Bodysuits
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=11&items__category=16&items__category=14&items__category=12&items__category=13&items__gender=boy&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Pants & Leggings
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=17&items__category=19&items__category=18&items__category=20&items__gender=boy&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Shorts & Skirts
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=30&items__category=76&items__category=77&items__category=78&items__category=81&items__category=82&items__category=83&items__category=84&items__category=80&items__category=79&items__gender=boy&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Dresses
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=21&items__category=91&items__category=25&items__category=23&items__category=24&items__category=22&items__category=90&items__category=26&items__category=29&items__gender=boy&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Pajamas & Sleepwear
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=21&items__category=91&items__category=25&items__category=23&items__category=24&items__category=22&items__category=90&items__category=26&items__category=29&items__gender=boy&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Jackets & Outerwear
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mega-menu-col col-lg-3">
              <ul>
                <li className="dropdown-header">&nbsp;</li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=38&items__category=39&items__category=40&items__category=41&items__category=42&items__gender=boy&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Sweaters & Hoodies
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=50&items__category=54&items__category=55&items__category=52&items__category=51&items__category=53&items__category=56&items__gender=boy&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Swimwear
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=57&items__category=60&items__category=92&items__category=58&items__category=62&items__category=61&items__gender=boy&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Undergarments
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=63&items__category=65&items__category=75&items__category=72&items__category=74&items__category=64&items__category=66&items__category=73&items__category=69&items__category=68&items__category=70&items__gender=boy&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Accessories & more
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=94&items__category=95&items__gender=boy&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    Shoes
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-bold nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    View All »
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mega-menu-col col-lg-3">
              <ul>
                <li className="dropdown-header">Sizes</li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=8"
                  >
                    Preemie
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=1"
                  >
                    Newborn
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=2"
                  >
                    3M (0-3 months)
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=3"
                  >
                    6M (3-6 months)
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mega-menu-col col-lg-3">
              <ul>
                <li className="dropdown-header">&nbsp;</li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=4"
                  >
                    9M (6-9 months)
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=5"
                  >
                    12M (9-12 months)
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=6"
                  >
                    18M (12-18 months)
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=9"
                  >
                    24M (18-24 months)
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-bold nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=8&items__size=1&items__size=2&items__size=3&items__size=4&items__size=5&items__size=6&items__size=9"
                  >
                    View All »
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </li>
      <li className="dropdown dropdown-mega-menu">
        <Link className="dropdown-toggle nav-link" to="#" data-toggle="dropdown">
          Toddler Girl
        </Link>
        <div className="dropdown-menu">
          <ul className="mega-menu d-lg-flex">
            <li className="mega-menu-col col-lg-3">
              <ul>
                <li className="dropdown-header">Categories</li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=7&items__category=8&items__category=9&items__category=10&items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Tops & Tees
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=1&items__category=2&items__category=87&items__category=88&items__category=89&items__category=4&items__category=6&items__category=3&items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    One Pieces & Bodysuits
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=11&items__category=16&items__category=14&items__category=12&items__category=13&items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Pants & Leggings
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=17&items__category=19&items__category=18&items__category=20&items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Shorts & Skirts
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=30&items__category=76&items__category=77&items__category=78&items__category=81&items__category=82&items__category=83&items__category=84&items__category=80&items__category=79&items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Dresses
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=21&items__category=91&items__category=25&items__category=23&items__category=24&items__category=22&items__category=90&items__category=26&items__category=29&items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Pajamas & Sleepwear
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=21&items__category=91&items__category=25&items__category=23&items__category=24&items__category=22&items__category=90&items__category=26&items__category=29&items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Jackets & Outerwear
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mega-menu-col col-lg-3">
              <ul>
                <li className="dropdown-header">&nbsp;</li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=38&items__category=39&items__category=40&items__category=41&items__category=42&items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Sweaters & Hoodies
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=50&items__category=54&items__category=55&items__category=52&items__category=51&items__category=53&items__category=56&items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Swimwear
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=57&items__category=60&items__category=92&items__category=58&items__category=62&items__category=61&items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Undergarments
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=63&items__category=65&items__category=75&items__category=72&items__category=74&items__category=64&items__category=66&items__category=73&items__category=69&items__category=68&items__category=70&items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Accessories & more
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=94&items__category=95&items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Shoes
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-bold nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    View All »
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mega-menu-col col-lg-3">
              <ul>
                <li className="dropdown-header">Sizes</li>
                <li>
                  <Link
                    className="dropdown-item nav_item"
                    to="/shop?items__gender=girl&items__size=24&items__size=10"
                  >
                    2 / 2T
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=25&items__size=11"
                  >
                    3 / 3T
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=26&items__size=12"
                  >
                    4 / 4T
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=27&items__size=13"
                  >
                    5 / 5T
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mega-menu-col col-lg-3">
              <ul>
                <li className="dropdown-header">Brands</li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13&items__brands=233"
                  >
                    Carter's
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13&items__brands=447"
                  >
                    Baby Gap
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13&items__brand=1488"
                  >
                    Cat & Jack
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13&items__brand=1438"
                  >
                    Old Navy
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13&items__brand=1488"
                  >
                    Janie & Jack
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-bold nav-link nav_item"
                    to="/shop?items__gender=girl&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    View All »
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </li>
      <li className="dropdown dropdown-mega-menu">
        <Link className="dropdown-toggle nav-link" to="#" data-toggle="dropdown">
          Toddler Boy
        </Link>
        <div className="dropdown-menu">
          <ul className="mega-menu d-lg-flex">
            <li className="mega-menu-col col-lg-3">
              <ul>
                <li className="dropdown-header">Categories</li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=7&items__category=8&items__category=9&items__category=10&items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Tops & Tees
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=1&items__category=2&items__category=87&items__category=88&items__category=89&items__category=4&items__category=6&items__category=3&items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    One Pieces & Bodysuits
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=11&items__category=16&items__category=14&items__category=12&items__category=13&items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Pants & Leggings
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=17&items__category=19&items__category=18&items__category=20&items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Shorts & Skirts
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=30&items__category=76&items__category=77&items__category=78&items__category=81&items__category=82&items__category=83&items__category=84&items__category=80&items__category=79&items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Dresses
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=21&items__category=91&items__category=25&items__category=23&items__category=24&items__category=22&items__category=90&items__category=26&items__category=29&items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Pajamas & Sleepwear
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=21&items__category=91&items__category=25&items__category=23&items__category=24&items__category=22&items__category=90&items__category=26&items__category=29&items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Jackets & Outerwear
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mega-menu-col col-lg-3">
              <ul>
                <li className="dropdown-header">&nbsp;</li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=38&items__category=39&items__category=40&items__category=41&items__category=42&items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Sweaters & Hoodies
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=50&items__category=54&items__category=55&items__category=52&items__category=51&items__category=53&items__category=56&items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Swimwear
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=57&items__category=60&items__category=92&items__category=58&items__category=62&items__category=61&items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Undergarments
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=63&items__category=65&items__category=75&items__category=72&items__category=74&items__category=64&items__category=66&items__category=73&items__category=69&items__category=68&items__category=70&items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Accessories & more
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__category=94&items__category=95&items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    Shoes
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-bold nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    View All »
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mega-menu-col col-lg-3">
              <ul>
                <li className="dropdown-header">Sizes</li>
                <li>
                  <Link
                    className="dropdown-item nav_item"
                    to="/shop?items__gender=boy&items__size=24&items__size=10"
                  >
                    2 / 2T
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=25&items__size=11"
                  >
                    3 / 3T
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=26&items__size=12"
                  >
                    4 / 4T
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=27&items__size=13"
                  >
                    5 / 5T
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mega-menu-col col-lg-3">
              <ul>
                <li className="dropdown-header">Brands</li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13&items__brands=233"
                  >
                    Carter's
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13&items__brands=447"
                  >
                    Baby Gap
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13&items__brand=1488"
                  >
                    Cat & Jack
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13&items__brand=1488"
                  >
                    Old Navy
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13&items__brand=1506"
                  >
                    Janie & Jack
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-bold nav-link nav_item"
                    to="/shop?items__gender=boy&items__size=24&items__size=10&items__size=25&items__size=11&items__size=26&items__size=12&items__size=27&items__size=13"
                  >
                    View All »
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <Link className="nav-link nav_item" to="/sell">
          Sell
        </Link>
      </li>
    </ul>
  )
}
export default HeaderMenu
