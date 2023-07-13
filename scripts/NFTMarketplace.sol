// SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extenstions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "harthat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIds;
  Counters.Counter private _itemsSold;
  
  uint256 listingPrice = 0.025 ether;

  address payable owner;

  mapping(uint256=>MarketItem)private idToMarketItem;

  struct MarketItem {
    uint256 tokenId,
    address payable seller,
    address payable owner,
    uint256 price,
    bool sold
  }

constructor(){
  owner = payable(msg.sender)
}

}