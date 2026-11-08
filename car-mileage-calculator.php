<?php
/**
 * Plugin Name: Car Mileage Calculator
 * Plugin URI: https://yourwebsite.com/plugins/car-mileage-calculator
 * Description: Calculate your vehicle's fuel efficiency and plan your trips with this easy-to-use calculator.
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://yourwebsite.com
 * Text Domain: car-mileage-calculator
 * License: GPL v2 or later
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('CMC_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('CMC_PLUGIN_URL', plugin_dir_url(__FILE__));
define('CMC_PLUGIN_VERSION', '1.0.0');

// Include required files
require_once CMC_PLUGIN_DIR . 'includes/cmc-shortcodes.php';
require_once CMC_PLUGIN_DIR . 'admin/cmc-admin.php';

// Register activation hook
register_activation_hook(__FILE__, 'cmc_activation');

// Register deactivation hook
register_deactivation_hook(__FILE__, 'cmc_deactivation');

/**
 * Actions to perform on plugin activation
 */
function cmc_activation() {
    // Activation tasks if needed
}

/**
 * Actions to perform on plugin deactivation
 */
function cmc_deactivation() {
    // Deactivation tasks if needed
}

/**
 * Enqueue plugin scripts and styles
 */
function cmc_enqueue_scripts() {
    // Only enqueue if shortcode is present on the page
    global $post;
    if (is_a($post, 'WP_Post') && (has_shortcode($post->post_content, 'car_mileage_calculator'))) {
        // Register and enqueue styles
        wp_register_style('cmc-google-fonts', 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap', array(), CMC_PLUGIN_VERSION);
        wp_register_style('cmc-styles', CMC_PLUGIN_URL . 'assets/css/cmc-styles.css', array('cmc-google-fonts'), CMC_PLUGIN_VERSION);
        wp_enqueue_style('cmc-styles');
        
        // Register and enqueue scripts
        wp_register_script('cmc-script', CMC_PLUGIN_URL . 'assets/js/cmc-script.js', array('jquery'), CMC_PLUGIN_VERSION, true);
        wp_enqueue_script('cmc-script');
    }
}
add_action('wp_enqueue_scripts', 'cmc_enqueue_scripts'); 