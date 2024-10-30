<?php
/**
 * Plugin Name: Hide Blocks
 * Description: This plugin allows you to hide blocks on a page.
 * Version: 1.0.3
 * Author: Jost DevOps UG (haftungsbeschränkt)
 * Author URI: https://www.jost-devops.de
 **/
if ( ! defined( 'WPINC' ) ) {
    die;
}

define( 'PLUGIN_NAME_VERSION', '1.0.3' );

function hide_blocks_init() {
    $index_asset_file = dirname(__FILE__) . '/build/index.asset.php';
    $index_asset = file_exists( $index_asset_file )
        ? require_once $index_asset_file
        : null;
    $index_dependencies = isset( $index_asset['dependencies'] ) ? $index_asset['dependencies'] : array();

    wp_enqueue_script(
        'hide-blocks-script',
        plugins_url( 'build/index.js', __FILE__ ),
        $index_dependencies
    );
}
add_action( 'enqueue_block_editor_assets', 'hide_blocks_init' );

function hide_blocks_render_callback($block_content, $block) {
    if ( isset($block['attrs']['hidden']) && $block['attrs']['hidden'] === true ) {
        return '';
    }

    return $block_content;
}
add_filter( 'render_block', 'hide_blocks_render_callback', 10, 2 );
