/**
*
* VaultItem
*
*/

import React from 'react';
import styled from 'styled-components';
import items from 'assets/itemshash.json';

const TooltipText = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
`;

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${TooltipText} {
    visibility: visible;
  }
`;

function VaultItem(props) {
  const item = items[props.item.slug];
  if (item == null) {
    return null;
  }
  return (
    <li>
      <TooltipContainer>
        <img src={`/assets/images/items/${item.img}`} />
        x{props.item.quantity}
        <TooltipText>{item.fr_name}</TooltipText>
      </TooltipContainer>
    </li>
  );
}

VaultItem.propTypes = {

};

export default VaultItem;
