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
