import assign from 'lodash.assign';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element'
import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody, ToggleControl } from '@wordpress/components';

const addHideBlockAttribute = ( settings, name ) => {
  settings.attributes = assign( settings.attributes, {
    hidden: {
      type: 'boolean',
      default: false
    },
  } );

  return settings;
};

addFilter( 'blocks.registerBlockType', 'hide-blocks/attribute/hidden', addHideBlockAttribute );

const withHiddenControl = createHigherOrderComponent( ( BlockEdit ) => {
  return ( props ) => {
    const { hidden } = props.attributes;

    if ( hidden ) {
      props.attributes.className = `hide-blocks-is-hidden`;
    }

    return (
      <Fragment>
        <BlockEdit { ...props } />
        <InspectorControls>
          <PanelBody
            title="Hide Block"
            initialOpen={ true }
          >
            <ToggleControl
              label="Hide Block"
              checked={ hidden }
              onChange={ () => {
                props.setAttributes( {
                  hidden: !hidden,
                } );
              } }
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  };
}, 'withHiddenControl' );

addFilter( 'editor.BlockEdit', 'hide-blocks/with-hidden-control', withHiddenControl );
