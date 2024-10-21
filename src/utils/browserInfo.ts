
export interface BrowserInfo {
    name: string;
    version: string;
  }
  
  export const getBrowserInfo = (): BrowserInfo => {
    const userAgent = navigator.userAgent;
    let name = "Unknown";
    let version = "0";
  
    // Chrome
    if (userAgent.match(/chrome|chromium|crios/i)) {
      name = "Chrome";
      const match = userAgent.match(/(?:chrome|chromium|crios)\/([0-9.]+)/i);
      if (match) version = match[1];
    }
    // Firefox
    else if (userAgent.match(/firefox|fxios/i)) {
      name = "Firefox";
      const match = userAgent.match(/(?:firefox|fxios)\/([0-9.]+)/i);
      if (match) version = match[1];
    }
    // Safari
    else if (userAgent.match(/safari/i)) {
      name = "Safari";
      const match = userAgent.match(/version\/([0-9.]+)/i);
      if (match) version = match[1];
    }
    // Edge
    else if (userAgent.match(/edg/i)) {
      name = "Edge";
      const match = userAgent.match(/edg\/([0-9.]+)/i);
      if (match) version = match[1];
    }
    // Opera
    else if (userAgent.match(/opr\//i)) {
      name = "Opera";
      const match = userAgent.match(/opr\/([0-9.]+)/i);
      if (match) version = match[1];
    }
  
    return { name, version };
  };