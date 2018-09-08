import styled from 'styled-components';

export default styled.ul`
  list-style-type: none;
  padding-left: 0;
  & > li > a {
    max-width: calc(100% - 1.25em);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  & > li:before {
    content: '';
    vertical-align: super;
    height: 15px;
    width: 15px;
    margin-left: 0.1em;
    margin-right: 0.1em;
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(data:application/x-123;base64,AAACAAEAICAAAAAAAwCoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAP8BAAD/AQAA/wEAAP8BAAD/AQAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAP8BAAD/EREU/xERFP8RERT/EREU/yIkS/8iJEv/AQAA/wEAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAD/EREU/xERFP8RERT/EREU/xERFP8RERT/HR0//x8iR/8fIkf/HyJH/wEAAP8BAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA/yQmT/8mKFP/EREU/xERFP8RERT/AQAA/wEAAP8UFC7/FBQu/x8iR/8dH0P/HyJH/x0fQ/8BAAD/AQAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAP8kJk//JihT/x8iR/8RERT/AQAA/wEAAP8gIDD/ICAw/wEAAP8BAAD/FBQu/xcXM/8dH0P/HR9D/x0fQ/8dH0P/AQAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAD/JCZP/yYoU/8dH0P/Gho4/wEAAP8gIDD/AAAAAAAAAAAgIDD/ICAw/yAgMP8BAAD/AQAA/xoaOP8aGjj/HR0//xERFP8RERT/AQAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA/yQmT/8mKFP/HyJH/wEAAP8BAAD/AAAAAAAAAAABAAD/AQAA/wEAAP8BAAD/AQAA/yAgMP8gIDD/AQAA/xERFP8RERT/EREU/xERFP8BAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAP8kJk//JihT/x0fQ/8BAAD/ICAw/wAAAAAAAAAAAQAA/yQmT/8mKFP/EREU/xERFP8RERT/AQAA/yAgMP8gIDD/AQAA/xERFP8RERT/EREU/wEAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAD/JCZP/yQmT/8iJEv/AQAA/wAAAAAAAAAAAAAAAAEAAP8kJk//JihT/x0fQ/8RERT/EREU/xERFP8RERT/AQAA/yAgMP8BAAD/EREU/xERFP8RERT/EREU/wEAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA/xERFP8RERT/EREU/wEAAP8AAAAAAAAAAAAAAAABAAD/JCZP/yQmT/8dH0P/AQAA/xERFP8RERT/EREU/xERFP8BAAD/ICAw/yAgMP8BAAD/EREU/xERFP8RERT/AQAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgMP8BAAD/EREU/xERFP8RERT/AQAA/wAAAAAAAAAAAQAA/xERFP8RERT/EREU/wEAAP8BAAD/AQAA/xERFP8RERT/EREU/xERFP8BAAD/ICAw/yAgMP8BAAD/EREU/xERFP8BAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAw/wEAAP8RERT/EREU/xERFP8BAAD/AAAAACAgMP8BAAD/EREU/xERFP8RERT/EREU/xERFP8BAAD/EREU/xERFP8RERT/EREU/wEAAP8AAAAAICAw/wEAAP8RERT/EREU/wEAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgIDD/AQAA/xERFP8RERT/AQAA/wAAAAAAAAAAICAw/wEAAP8RERT/EREU/xERFP8RERT/EREU/wEAAP8RERT/EREU/xERFP8RERT/EREU/wEAAP8gIDD/AQAA/x0fQ/8kJk//AQAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAP8RERT/EREU/xERFP8BAAD/AAAAAAAAAAAgIDD/AQAA/xERFP8RERT/EREU/wEAAP8BAAD/ICAw/wEAAP8RERT/EREU/xERFP8RERT/AQAA/yAgMP8BAAD/HyJH/x0fQ/8BAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAgIDD/AQAA/xERFP8RERT/EREU/wEAAP8AAAAAAAAAACAgMP8BAAD/EREU/xERFP8RERT/AQAA/wAAAAAgIDD/AQAA/xERFP8RERT/EREU/xERFP8BAAD/AQAA/x8iR/8kJk//Gho4/wEAAP8AAAAAAAAAAAAAAAAAAAAAAQAA/wEAAP8dH0P/EREU/xERFP8iJEv/HyJH/wEAAP8AAAAAICAw/wEAAP8RERT/EREU/xERFP8RERT/AQAA/yAgMP8BAAD/EREU/xERFP8RERT/EREU/wEAAP8BAAD/IiRL/x8iR/8XFzP/AQAA/wAAAAAAAAAAAAAAAAAAAAAfIkf/HyJH/yYoU/8RERT/JCZP/x8iR/8aGjj/AQAA/wAAAAAgIDD/AQAA/xERFP8RERT/EREU/xERFP8BAAD/AQAA/yIkS/8kJk//JihT/xQULv8BAAD/ICAw/wEAAP8kJk//HR9D/wEAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAEAAP8dH0P/HyJH/x8iR/8iJEv/Gho4/wEAAP8AAAAAAAAAACAgMP8gIDD/AQAA/xERFP8RERT/EREU/xERFP8RERT/JCZP/x0fQ/8aGjj/AQAA/wAAAAABAAD/IiRL/yQmT/8dHT//AQAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAICAw/wEAAP8dH0P/HR9D/x8iR/8BAAD/AAAAAAAAAAAAAAAAAAAAACAgMP8BAAD/EREU/xERFP8RERT/EREU/xERFP8RERT/Gho4/wEAAP8AAAAAICAw/wEAAP8kJk//IiRL/xoaOP8BAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAgIDD/AQAA/x0dP/8dHT//AQAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAICAw/wEAAP8RERT/EREU/xcXM/8dHT//EREU/xERFP8UFC7/AQAA/wAAAAABAAD/AQAA/yQmT/8dH0P/Fxcz/wEAAP8AAAAAAAAAAAAAAAAAAAAAAAAAACAgMP8BAAD/Gho4/wEAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgIDD/ICAw/wEAAP8dHT//Gho4/xcXM/8dH0P/AQAA/wEAAP8BAAD/AQAA/xERFP8RERT/EREU/xERFP8UFC7/AQAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAICAw/wEAAP8XFzP/AQAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgIDD/ICAw/wEAAP8aGjj/Gho4/xQULv8dH0P/AQAA/xERFP8RERT/EREU/xERFP8RERT/AQAA/wEAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgIDD/ICAw/wEAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgIDD/ICAw/wEAAP8XFzP/Fxcz/xQULv8fIkf/EREU/xERFP8RERT/AQAA/wEAAP8gIDD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgMP8gIDD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgIDD/ICAw/wEAAP8UFC7/Fxcz/xQULv8iJEv/EREU/wEAAP8gIDD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgIDD/ICAw/wEAAP8UFC7/FBQu/x0dP/8BAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgIDD/ICAw/wEAAP8BAAD/AQAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgIDD/ICAw/yAgMP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////////////////+B///+AH///AAf//gAB//wAAP/4DAB/8DAAf+BgAH/BwAA/g4AAPwMAAD8CAAg/BgAAPwYAAD4GBAA8AgAAPAIAAHwGABB8DwAgfB8AIHw/AAB8P4AA/H/AAfz/4Af///Af///4P////H/8=);
  }
`;
