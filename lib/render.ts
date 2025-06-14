export function renderHTML(): string {
  return /* html */ `
  <div class="jb-file-input-web-component">
    <div class="placeholder-wrapper">
        <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                id="Layer_1" x="0px" y="0px" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;"
                xml:space="preserve">
                <style type="text/css">

                </style>
                <path class="st0"
                    d="M46.5,60.4H17.5c-4.4,0-8-3.6-8-8V11.6c0-4.4,3.6-8,8-8h29.1c4.4,0,8,3.6,8,8v40.8  C54.5,56.8,50.9,60.4,46.5,60.4z" />
                <path class="st1" d="M46.7,43.7" />
                <path class="st1" d="M18.4,43.7" />
                <line class="st1" x1="18.1" y1="43.7" x2="46.5" y2="43.7" />
                <line class="st1" x1="18.1" y1="50.7" x2="46.5" y2="50.7" />
                <line class="st1" x1="18.1" y1="36.7" x2="46.5" y2="36.7" />
                <path class="st2"
                    d="M44.7,28.6c-2.2,0-4.2-0.8-5.8-2.4c-1.5-1.5-2.4-3.6-2.4-5.8c0-2.2,0.8-4.2,2.4-5.8L52.1,2.5   c1.2-1.2,2.8-1.9,4.6-1.9c1.7,0,3.4,0.7,4.6,1.9c2.5,2.5,2.5,6.7,0,9.2L49.8,22.4c-1.9,1.9-5,1.9-6.9,0c-0.9-0.9-1.4-2.2-1.4-3.5   c0-1.3,0.5-2.5,1.4-3.5l0,0l6.4-5.5c0.3-0.3,0.9-0.3,1.2,0.1c0.3,0.3,0.3,0.9-0.1,1.2l-6.4,5.5c-0.6,0.6-0.9,1.4-0.9,2.3   c0,0.9,0.3,1.7,0.9,2.3c1.3,1.3,3.3,1.3,4.6,0l11.6-10.6c1.9-1.9,1.9-4.9,0-6.8c-0.9-0.9-2.1-1.4-3.4-1.4c-1.3,0-2.5,0.5-3.4,1.4   L40.2,15.9c-1.2,1.2-1.9,2.8-1.9,4.6c0,1.7,0.7,3.4,1.9,4.6c1.2,1.2,2.8,1.9,4.6,1.9c1.7,0,3.4-0.7,4.6-1.9l11.8-11   c0.3-0.3,0.9-0.3,1.2,0c0.3,0.3,0.3,0.9,0,1.2l-11.8,11C49,27.8,46.9,28.6,44.7,28.6z" />
                <path class="st0"
                    d="M29.2,30.2h-8.9c-1.2,0-2.1-1-2.1-2.1v-9.6c0-1.2,1-2.1,2.1-2.1h8.9c1.2,0,2.1,1,2.1,2.1v9.6  C31.3,29.3,30.3,30.2,29.2,30.2z" />
                <line class="st3" x1="54.5" y1="25.1" x2="54.5" y2="19.3" />
            </svg>
        </div>
        <div class="placeholder-title">انتخاب فایل</div>
    </div>
    <div class="file-wrapper">
        <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                id="Layer_1" x="0px" y="0px" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;"
                xml:space="preserve">
                <style type="text/css">

                </style>
                <path class="st0"
                    d="M46.5,60.4H17.5c-4.4,0-8-3.6-8-8V11.6c0-4.4,3.6-8,8-8h29.1c4.4,0,8,3.6,8,8v40.8  C54.5,56.8,50.9,60.4,46.5,60.4z" />
                <path class="st1" d="M46.7,43.7" />
                <path class="st1" d="M18.4,43.7" />
                <line class="st1" x1="18.1" y1="43.7" x2="46.5" y2="43.7" />
                <line class="st1" x1="18.1" y1="50.7" x2="46.5" y2="50.7" />
                <line class="st1" x1="18.1" y1="36.7" x2="46.5" y2="36.7" />
                <path class="st2"
                    d="M44.7,28.6c-2.2,0-4.2-0.8-5.8-2.4c-1.5-1.5-2.4-3.6-2.4-5.8c0-2.2,0.8-4.2,2.4-5.8L52.1,2.5   c1.2-1.2,2.8-1.9,4.6-1.9c1.7,0,3.4,0.7,4.6,1.9c2.5,2.5,2.5,6.7,0,9.2L49.8,22.4c-1.9,1.9-5,1.9-6.9,0c-0.9-0.9-1.4-2.2-1.4-3.5   c0-1.3,0.5-2.5,1.4-3.5l0,0l6.4-5.5c0.3-0.3,0.9-0.3,1.2,0.1c0.3,0.3,0.3,0.9-0.1,1.2l-6.4,5.5c-0.6,0.6-0.9,1.4-0.9,2.3   c0,0.9,0.3,1.7,0.9,2.3c1.3,1.3,3.3,1.3,4.6,0l11.6-10.6c1.9-1.9,1.9-4.9,0-6.8c-0.9-0.9-2.1-1.4-3.4-1.4c-1.3,0-2.5,0.5-3.4,1.4   L40.2,15.9c-1.2,1.2-1.9,2.8-1.9,4.6c0,1.7,0.7,3.4,1.9,4.6c1.2,1.2,2.8,1.9,4.6,1.9c1.7,0,3.4-0.7,4.6-1.9l11.8-11   c0.3-0.3,0.9-0.3,1.2,0c0.3,0.3,0.3,0.9,0,1.2l-11.8,11C49,27.8,46.9,28.6,44.7,28.6z" />
                <path class="st0"
                    d="M29.2,30.2h-8.9c-1.2,0-2.1-1-2.1-2.1v-9.6c0-1.2,1-2.1,2.1-2.1h8.9c1.2,0,2.1,1,2.1,2.1v9.6  C31.3,29.3,30.3,30.2,29.2,30.2z" />
                <line class="st3" x1="54.5" y1="25.1" x2="54.5" y2="19.3" />
            </svg>
        </div>
        <div class="file-name"></div>
    </div>
  </div>
      `;
}