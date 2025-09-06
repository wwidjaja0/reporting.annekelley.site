<?php
// =============================
// Secure Proxy for API Requests
// =============================

// Allow frontend access (adjust origin if you want to restrict)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight (OPTIONS request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Get params safely
$resource = $_GET['resource'] ?? '';
$cols     = $_GET['cols'] ?? '';

// Handle array of cols (cols[]=userLang&cols[]=userAgent)
if (is_array($cols)) {
    $cols = implode(',', $cols); // turn into "userLang,userAgent"
}

// Build the API URL
$apiUrl = "https://annekelley.site/api.php";
if ($resource !== '') {
    $apiUrl .= "/" . urlencode($resource);
}
if ($cols !== '') {
    $apiUrl .= "/" . urlencode($cols);
}

// Initialize cURL
$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Add Basic Auth credentials (hidden from client)
curl_setopt($ch, CURLOPT_USERPWD, "Anne:f0ll0werofLuthien1902!");

// Forward headers (optional, JSON expected)
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Accept: application/json"
]);

// Execute request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

// Forward response to browser
http_response_code($httpCode);

// If upstream failed, wrap response in JSON for clarity
if ($httpCode >= 400) {
    echo json_encode([
        "error" => "Upstream API error",
        "status" => $httpCode,
        "body"   => $response
    ]);
    exit;
}

// Otherwise, pass through the API response
echo $response;
