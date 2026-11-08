=== Car Mileage Calculator ===
Contributors: yourname
Tags: calculator, car, mileage, fuel efficiency, trip planner
Requires at least: 5.0
Tested up to: 6.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Calculate vehicle fuel efficiency and plan trips with cost estimates using this versatile car mileage calculator.

== Description ==

Car Mileage Calculator is a versatile WordPress plugin that allows your website visitors to:

* Calculate fuel efficiency (km/l, mpg, etc.)
* Plan trips and estimate fuel costs
* Work with different units (miles/kilometers, gallons/liters)
* Use multiple currencies for cost calculations

The calculator features two main tools:

1. **Fuel Efficiency Calculator** - Calculate how efficient your vehicle is based on distance traveled and fuel used.
2. **Trip Planner** - Plan future trips by estimating fuel requirements and costs.

### Features

* Clean, modern interface
* Responsive design that works on mobile and desktop
* Support for multiple units (kilometers/miles, liters/gallons)
* Support for multiple currencies
* Easy to use shortcode with customizable parameters
* Tabbed interface to switch between calculators

### Usage

Simply add the shortcode `[car_mileage_calculator]` to any page or post to display the calculator.

**Available Shortcode Parameters:**

* `title` - The title displayed at the top of the calculator (default: "Car Mileage Calculator")
* `subtitle` - The subtitle displayed below the title (default: "Calculate your vehicle's fuel efficiency and plan your trips")
* `show_efficiency` - Whether to show the fuel efficiency calculator tab (yes/no, default: yes)
* `show_trip` - Whether to show the trip planner tab (yes/no, default: yes)

**Examples:**

Basic usage:
`[car_mileage_calculator]`

Custom title:
`[car_mileage_calculator title="My Fuel Calculator"]`

Only show trip planner:
`[car_mileage_calculator show_efficiency="no" show_trip="yes"]`

== Installation ==

1. Upload the `car-mileage-calculator` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Place the shortcode `[car_mileage_calculator]` in your pages or posts

== Frequently Asked Questions ==

= Can I customize the colors to match my theme? =

The calculator is designed to work with most themes out of the box. For custom styling, you can add custom CSS to your theme.

= Can I use different currencies? =

Yes, the plugin supports 7 common currencies: USD, EUR, GBP, JPY, INR, CAD, and AUD.

= Can I show only one calculator (efficiency or trip planner)? =

Yes, use the shortcode parameters `show_efficiency` and `show_trip` to control which calculators are displayed.

== Screenshots ==

1. Fuel Efficiency Calculator
2. Trip Planner Calculator
3. Admin Settings Page

== Changelog ==

= 1.0.0 =
* Initial release

== Upgrade Notice ==

= 1.0.0 =
Initial release 