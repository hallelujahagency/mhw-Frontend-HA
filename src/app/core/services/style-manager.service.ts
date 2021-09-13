import { Injectable } from '@angular/core';
declare var $;

/**
 * Class for managing stylesheets. Stylesheets are loaded into named slots so that they can be
 * removed or changed later.
 */
@Injectable()
export class StyleManagerService {



  /**
   * Set the stylesheet with the specified key.
   */
  setStyle(key: string, href: string) {
    getLinkElementForKey(key).setAttribute('href', href);
  }

  /**
   * Remove the stylesheet with the specified key.
   */
  removeStyle(key: string) {
    const existingLinkElement = getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }

}

function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(`link[rel="stylesheet"].${getClassNameForKey(key)}`);
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.setAttribute('media', 'screen');
  linkEl.setAttribute('id', 'color');
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `style-manager-${key}`;
}

  // Rating Stars Output
 function starsOutput(firstStar:string, secondStar:string, thirdStar:string, fourthStar:string, fifthStar:string) {

    let valueData =  ''+
    '<span class="'+firstStar+'"></span>'+
    '<span class="'+secondStar+'"></span>'+
    '<span class="'+thirdStar+'"></span>'+
    '<span class="'+fourthStar+'"></span>'+
    '<span class="'+fifthStar+'"></span>';
  
  return valueData;
  }




