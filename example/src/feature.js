import { html,ArcComponent } from '../../src';
import './css/styles.css'
class FeatureComponent extends ArcComponent {
    constructor(props){
        super(props)
    }
    render() {
        return html`
          <section class="features">
            <div class="container">
              <div class="feature">
                <h3>Sell any product online</h3>
                <p>Over 92% of computers are infected with Adware and spyware. Such software is...</p>
              </div>
              <div class="feature">
                <h3>Very easy to customize</h3>
                <p>Many of us are so used to working on a computer desktop that when it comes...</p>
              </div>
              <div class="feature">
                <h3>Unlimited colors</h3>
                <p>Audio player software is used to play back sound recordings in one of the many...</p>
              </div>
              <div class="feature">
                <h3>Responsive, HTML5, CSS3</h3>
                <p>Computers have become ubiquitous in almost every facet of our lives. At work...</p>
              </div>
              <div class="feature">
                <h3>Designed to convert</h3>
                <p>Now, if you are looking for a new way to promote your business that won’t cost...</p>
              </div>
              <div class="feature">
                <h3>With no boundaries</h3>
                <p>If you are interested in being the best player, getting really good money and...</p>
              </div>
            </div>
          </section>
        `;
      }
}
FeatureComponent.registerComponent('FeatureComponent');


export default FeatureComponent;