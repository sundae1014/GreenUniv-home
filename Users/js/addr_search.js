function searchAddr() {
  const query = document.getElementById('postal_code').value;
  const resultContainer = document.getElementById('basic_addr');
  resultContainer.innerHTML = '주소를 검색 중입니다...';

  // 실제 카카오(Daum) 주소 검색 API URL을 사용합니다.
  // 이 예시는 가상의 URL이며, 실제 사용 시에는 API 문서를 참고해야 합니다.
  const API_KEY = "YOUR_API_KEY"; 
  const apiUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}`;

  fetch(apiUrl, {
    headers: {
      'Authorization': `KakaoAK ${API_KEY}`
    }
  })
  .then(response => response.json())
  .then(data => {
    // API 응답 데이터가 있을 때만 처리
    if (data.documents && data.documents.length > 0) {
      resultContainer.innerHTML = ''; // 이전 결과 삭제
      data.documents.forEach(doc => {
        const addressName = doc.address_name;
        const postalCode = doc.road_address ? doc.road_address.zone_no : 'N/A';
        
        const resultItem = document.createElement('p');
        resultItem.textContent = `[${postalCode}] ${addressName}`;
        resultItem.onclick = () => selectAddress(postalCode, addressName);
        resultContainer.appendChild(resultItem);
      });
    } else {
      resultContainer.innerHTML = '검색 결과가 없습니다.';
    }
  })
  .catch(error => {
    console.error('API 호출 중 오류 발생:', error);
    resultContainer.innerHTML = '검색에 실패했습니다.';
  });
}

function selectAddr(postalCode, address) {
  alert(`선택된 우편번호: ${postalCode}, 주소: ${address}`);
  // 실제로 우편번호와 주소 입력란에 값을 자동으로 채워넣을 수 있습니다.
  // 예: document.getElementById('zipcode').value = postalCode;
  // 예: document.getElementById('main-address').value = address;
}