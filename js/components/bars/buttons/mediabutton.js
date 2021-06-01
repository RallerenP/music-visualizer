import { globals } from "../../../settings.js";
import { colors } from '../../../UI/color.js'

export class MediaButton {
    constructor(icon, x, y, width, height, color, hoverColor, textColor, textHoverColor) {
        this.icon = icon;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.hoverColor = hoverColor;
        this.textColor = textColor;
        this.textHoverColor = textHoverColor;
        this.padding = 10;

        this.onclick = () => {}

        window.addEventListener('click', () => {
            if (this._isHovered()) {
                this.onclick();
            }
        });
    }

    draw() {
        const p = globals.sketch;
        const { unhex } = colors

        p.textFont(globals.icons_solid);

        const hovered = this._isHovered();
        
        if (hovered) {
            p.fill(unhex(this.hoverColor));
            globals.cursor = "pointer";
        } else {
            p.fill(unhex(this.color));
        }

        p.rect(this.x, this.y, this.height, this.width, 5, 5, 5, 5);

        if (hovered) {
            p.fill(unhex(this.textHoverColor));
        } else {
            p.fill(unhex(this.textColor));
        }
        
        p.textAlign(p.CENTER, p.CENTER)
        p.textSize(this.height - 10);

        p.text(this.icon, this.x + (this.width / 2), this.y + (this.height / 2) - 1);
    }

    update(x, y, width, height) {
        if (x) this.x = x;
        if (y) this.y = y;
        if (width) this.width = width;
        if (height) this.height = height;
    }

    _isHovered() {
        const p = globals.sketch;
        const { mouseX, mouseY } = p;

        if ((mouseX > this.x && this.x + this.width > mouseX) &&
            (mouseY > this.y && this.y + this.height > mouseY)) {
                return true;
            }

        return false;
    }

    
}