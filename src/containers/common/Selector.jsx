import React from 'react';

class Selector extends React.Component {
  render() {
    return <div className="blockbuilder-layer-selector">
      <div className="blockbuilder-layer-type">Row</div>
      <div className="blockbuilder-layer-drag blockbuilder-layer-drag-rows">
        <svg className="svg-inline--fa fa-arrows fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M352.634 428.621l-74.007 74.007c-12.497 12.497-32.758 12.497-45.255 0l-74.007-74.007c-9.373-9.373-9.373-24.569 0-33.941l10.84-10.84c9.556-9.556 25.113-9.341 34.402.474L228 410.365V284H101.635l26.051 23.392c9.815 9.289 10.03 24.846.474 34.402l-10.84 10.84c-9.373 9.373-24.569 9.373-33.941 0L9.373 278.627c-12.497-12.497-12.497-32.758 0-45.255l74.007-74.007c9.373-9.373 24.569-9.373 33.941 0l10.84 10.84c9.556 9.556 9.341 25.114-.474 34.402L101.635 228H228V101.635l-23.392 26.051c-9.289 9.815-24.846 10.03-34.402.474l-10.84-10.84c-9.373-9.373-9.373-24.569 0-33.941l74.007-74.007c12.497-12.497 32.758-12.497 45.255 0l74.007 74.007c9.373 9.373 9.373 24.569 0 33.941l-10.84 10.84c-9.556 9.556-25.113 9.341-34.402-.474L284 101.635V228h126.365l-26.051-23.392c-9.815-9.289-10.03-24.846-.474-34.402l10.84-10.84c9.373-9.373 24.569-9.373 33.941 0l74.007 74.007c12.497 12.497 12.497 32.758 0 45.255l-74.007 74.007c-9.373 9.373-24.569 9.373-33.941 0l-10.84-10.84c-9.556-9.556-9.341-25.113.474-34.402L410.365 284H284v126.365l23.392-26.051c9.289-9.815 24.846-10.03 34.402-.474l10.84 10.84c9.373 9.372 9.373 24.568 0 33.941z"></path>
        </svg>
      </div>
      <div className="blockbuilder-layer-controls blockbuilder-layer-controls-rows">
        <div style={{display:'inline'}}>
          <a className="blockbuilder-layer-control blockbuilder-delete">
            <svg className="svg-inline--fa fa-trash-alt fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor" d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"></path>
            </svg>
          </a>
        </div>
        <div style={{display:'inline'}}>
          <a className="blockbuilder-layer-control">
            <svg className="svg-inline--fa fa-clone fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M464 0c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48H176c-26.51 0-48-21.49-48-48V48c0-26.51 21.49-48 48-48h288M176 416c-44.112 0-80-35.888-80-80V128H48c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h288c26.51 0 48-21.49 48-48v-48H176z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>;
  }
}

export default Selector;