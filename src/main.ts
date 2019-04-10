import { FloaterBoxComponent } from "./floater-box";

window.customElements.define('floater-box', FloaterBoxComponent);

class Floater {
    private boxComponent: any;

    constructor(
        config: Config,
    ) {
        this.boxComponent = document.createElement('floater-box');
        this.boxComponent.config = config;
        const parent = config.parent || document.body;
        parent.appendChild(this.boxComponent);
    }
}


export default (config: Config) => new Floater(config);

interface Config {
    align: 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT';
    backdrop: boolean;
    parent: HTMLElement;
}
