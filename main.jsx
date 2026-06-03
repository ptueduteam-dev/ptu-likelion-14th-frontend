import { useReducer, useState } from "react";
import { createRoot } from "react-dom/client";

// 1. 추천수 상태 변화를 처리하는 Reducer 함수 정의
function recommendationReducer(state, action) {
  switch (action.type) {
    case "UP":
      // Math.min을 사용하여 최대 100까지만 증가하도록 제한
      return { ...state, count: Math.min(100, state.count + action.payload) };
    case "DOWN":
      // Math.max를 사용하여 최소 0까지만 감소하도록 제한 (음수 방지)
      return { ...state, count: Math.max(0, state.count - action.payload) };
    default:
      return state;
  }
}

// 2. 메인 컴포넌트
function RecommendationApp() {
  const [inputValue, setInputValue] = useState(1); // 기본 증감 수량 (초기값: 1)
  const [state, dispatch] = useReducer(recommendationReducer, { count: 0 }); // 추천수 초기값: 0

  // Input 값 변경 함수 (교안 17페이지 구조 반영)
  const handleChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setInputValue(isNaN(val) ? 0 : val);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>👍 추천수 제어 시스템</h1>
      
      {/* 0/100 형태로 화면에 상시 표시 */}
      <h2>현재 추천수: {state.count} / 100</h2>
      
      <p>
        <input 
          type="number" 
          value={inputValue} 
          onChange={handleChange} 
          placeholder="수량 입력" 
          min="1"
        />
      </p>
      
      {/* 버튼 클릭 시 설정된 inputValue만큼 증가/감소 */}
      <button onClick={() => dispatch({ type: "UP", payload: inputValue })}>
        추천 증가 (+{inputValue})
      </button>
      <button onClick={() => dispatch({ type: "DOWN", payload: inputValue })}>
        추천 감소 (-{inputValue})
      </button>
    </div>
  );
}

// React 루트 렌더링
createRoot(document.getElementById("root")).render(<RecommendationApp />);