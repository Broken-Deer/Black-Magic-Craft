export default {
    template: /* html */ `
    <div class="dialog_main">
        <div>
            <ul>
                <li>
                    <div></div>
                </li>
                <li>
                    <div></div>
                </li>
            </ul>
        </div>
        <div>
            <div class="nearly-color">
                <div class="a" id="c" onclick="choosedNearlyColor(this)"></div>
                <div class="a" id="b" onclick="choosedNearlyColor(this)"></div>
                <div class="b" id="a"></div>
                <div class="a" id="d" onclick="choosedNearlyColor(this)"></div>
                <div class="a" id="e" onclick="choosedNearlyColor(this)"></div>
            </div>
            <div class="color">
                <div class="range">
                    <input type="range" max="359" step="1" min="0" name="" id="h" value="0"
                        oninput="SliderUpdateUI()" />
                    <input type="range" max="100" step="1" min="0" name="" id="s" value="0"
                        oninput="SliderUpdateUI()" />
                    <input type="range" max="100" step="1" min="0" name="" id="v" value="0"
                        oninput="SliderUpdateUI()" />
                </div>
                <div class="input">
                    <div>
                        <div>HEX</div>
                        <input type="text" id="hex" oninput="inputUpdateUI(this, 'hex')">
                    </div>
                    <div>
                        <div>RGB</div>
                        <input type="text" id="rgb" oninput="inputUpdateUI(this, 'rgb')">
                    </div>
                </div>
            </div>
            <ul>
                <li>
                    <div>HSV</div><input type="text" id="hsv" oninput="inputUpdateUI(this, 'hsv')">
                </li>
                <li>
                    <div>HSL</div><input type="text" id="hsl" oninput="inputUpdateUI(this, 'hsl')">
                </li>
                <li>
                    <div>CIELAB</div><input type="text" id="lab" oninput="inputUpdateUI(this, 'lab')"
                        readonly="readonly">
                </li>
                <li>
                    <div>CIEXYZ</div><input type="text" id="xyz" oninput="inputUpdateUI(this, 'xyz')"
                        readonly="readonly">
                </li>
                <li>
                    <div>LUV</div><input type="text" id="luv" oninput="inputUpdateUI(this, 'luv')" readonly="readonly">
                </li>
            </ul>
        </div>
    </div>
`,
};