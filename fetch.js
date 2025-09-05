/* Given the parameters: 
  - resource (string): "static", "performance", or "activity"
  - colNames (array[string]): includes requested columns
Creates a data request from api.php of the form:
  api.php/{resource}/{col_1}&{col_2}&...&{col_n}
where resource specifies the table name and each col_i is a requested column of that table.
Returns JSON encoding of response
 !--- Need to get the JSON encoding into the right format for ZingChart ---!
*/

export async function getData(resource, colNames) {
  const cols = colNames.join("&");
  const url = `/proxy.php?resource=${encodeURIComponent(resource)}&cols=${encodeURIComponent(cols)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    console.log("Proxy response:", result);
    return result;
  } catch (err) {
    console.error("Proxy fetch failed:", err);
  }
}

export function userAgentsToWordCloud() {
  try {
    return console.log(getData("static", ["userAgent"]));
      // .map(item => {
      //   const ua = item.userAgent;
      //   let parts = [];

      //   // --- Browser + version ---
      //   if (/Chrome\/(\d+)/.test(ua) && !/Edg\//.test(ua)) {
      //     const version = ua.match(/Chrome\/(\d+)/)[1];
      //     parts.push(`Chrome_${version}`);
      //   } else if (/Version\/(\d+).+Safari\//.test(ua) && !/Chrome\//.test(ua)) {
      //     const version = ua.match(/Version\/(\d+)/)[1];
      //     parts.push(`Safari_${version}`);
      //   } else if (/Firefox\/(\d+)/.test(ua)) {
      //     const version = ua.match(/Firefox\/(\d+)/)[1];
      //     parts.push(`Firefox_${version}`);
      //   } else if (/Edg\/(\d+)/.test(ua)) {
      //     const version = ua.match(/Edg\/(\d+)/)[1];
      //     parts.push(`Edge_${version}`);
      //   } else {
      //     parts.push("Other");
      //   }

      //   // --- OS ---
      //   if (/Windows NT 10/.test(ua)) {
      //     parts.push("Windows_10");
      //   } else if (/Windows NT 11/.test(ua)) {
      //     parts.push("Windows_11");
      //   } else if (/Mac OS X 10_15/.test(ua)) {
      //     parts.push("MacOS_10_15");
      //   } else if (/Mac OS X 11/.test(ua)) {
      //     parts.push("MacOS_11");
      //   } else if (/Linux/.test(ua)) {
      //     parts.push("Linux");
      //   }

      //   return parts.join(" ");
      // })
      // .join(" ");
  } catch (err) {
    console.error("Error processing user agents:", err);
    return "";
  }
}
