import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";

const questions = [
	{ id: 1, question: "애니 하루에 몇 편 봄?", type: "select", options: ["0", "1", "2", "3", "4 이상"] },
	{ id: 2, question: "피규어 몇 개 있음?", type: "select", options: ["0", "1~3", "4~10", "10 이상"] },
	{ id: 3, question: "밖에 나가는 거 좋아함?", type: "select", options: ["yes", "no"] },
	{ id: 4, question: "마지막 연애가 언제임? (년 단위)", type: "select", options: ["0", "1", "2", "3 이상"] },
	{ id: 5, question: "게임 하루에 몇 시간 함?", type: "select", options: ["0", "1", "2~3", "4 이상"] },
	{ id: 6, question: "주말에 외출 안 하고 집에 있음?", type: "select", options: ["yes", "no"] },
	{ id: 7, question: "카카오톡 답장 평균 시간? (분 단위)", type: "select", options: ["1", "5", "10~30", "1시간 이상"] },
	{ id: 8, question: "최근 1년간 술자리 몇 번 있음?", type: "select", options: ["0", "1~2", "3~5", "6회 이상"] },
	{ id: 9, question: "보는 유튜브 채널 몇 개 있음?", type: "select", options: ["0", "1~3", "4~6", "7개 이상"] },
	{ id: 10, question: "애니 굿즈 외에 덕질템 소장 중?", type: "select", options: ["yes", "no"] },
	{ id: 11, question: "최근 콘서트나 행사 참석 여부", type: "select", options: ["yes", "no"] },
	{ id: 12, question: "취미로 혼자 하는 활동 시간 (하루 기준)", type: "select", options: ["0", "1", "2~3", "4시간 이상"] },
	{ id: 13, question: "웹툰 정기 결제하고 있음?", type: "select", options: ["yes", "no"] },
	{ id: 14, question: "아는 애니 제목 대충 몇 개?", type: "select", options: ["0", "1~5", "6~10", "10개 이상"] },
	{ id: 15, question: "지금 쓰는 닉네임에 '짱', '쿤', '님' 들어감?", type: "select", options: ["yes", "no"] },
	{ id: 16, question: "혼밥 가능?", type: "select", options: ["yes", "no"] },
	{ id: 17, question: "카페 가면 주로 뭐 함?", type: "select", options: ["공부", "작업", "혼자노는중", "친구만남"] },
	{ id: 18, question: "집에 덕후존 있음?", type: "select", options: ["yes", "no"] },
	{ id: 19, question: "SNS에 셀카 올린 마지막 시기? (월 단위)", type: "select", options: ["0", "1~3", "4~6", "6개월 이상"] },
	{ id: 20, question: "애니나 게임 OST 자주 들음?", type: "select", options: ["yes", "no"] },
];

const NerdScoreTest = () => {
	const [answers, setAnswers] = useState({});
	const [result, setResult] = useState(null);
	const resultRef = useRef(null);

	const handleChange = (id, value) => {
		setAnswers((prev) => ({ ...prev, [id]: value }));
	};

	const calculateScore = () => {
		let nerd_score = 0;
		let otaku_score = 0;

		for (const q of questions) {
			const val = answers[q.id]?.toLowerCase?.() || answers[q.id];
			const intVal = parseInt(val);

			try {
				switch (q.id) {
					case 1:
						nerd_score += Math.min(intVal * 10, 30);
						otaku_score += Math.min(intVal * 10, 30);
						break;
					case 2:
						nerd_score += Math.min(intVal * 5, 20);
						otaku_score += Math.min(intVal * 8, 30);
						break;
					case 3:
						if (val === "no") nerd_score += 20;
						break;
					case 4:
						nerd_score += Math.min(intVal * 5, 25);
						break;
					case 5:
						nerd_score += Math.min(intVal * 8, 30);
						otaku_score += Math.min(intVal * 5, 25);
						break;
					case 6:
						if (val === "yes") nerd_score += 10;
						break;
					case 7:
						nerd_score += Math.min(intVal / 5, 10);
						break;
					case 8:
						nerd_score += Math.max(10 - intVal, 0);
						break;
					case 9:
						otaku_score += Math.min(intVal, 10);
						break;
					case 10:
						if (val === "yes") otaku_score += 10;
						break;
					case 11:
						if (val === "no") nerd_score += 10;
						break;
					case 12:
						nerd_score += Math.min(intVal * 2, 10);
						break;
					case 13:
						if (val === "yes") otaku_score += 10;
						break;
					case 14:
						otaku_score += Math.min(intVal / 5, 10);
						break;
					case 15:
						if (val === "yes") nerd_score += 10;
						break;
					case 16:
						if (val === "yes") nerd_score += 5;
						break;
					case 17:
						if (["공부", "작업", "혼자노는중"].includes(val)) nerd_score += 5;
						break;
					case 18:
						if (val === "yes") otaku_score += 10;
						break;
					case 19:
						nerd_score += Math.min(intVal, 10);
						break;
					case 20:
						if (val === "yes") otaku_score += 10;
						break;
				}
			} catch (e) {
				continue;
			}
		}

		const nerd_percent = Math.min(nerd_score, 100);
		const otaku_power = Math.min(otaku_score, 100);

		let social_level = "";
		let comment = "";

		if (nerd_percent > 80) {
			social_level = "집밖은 위험해";
			comment = "형 이건 좀 치료 받아야 될지도...?";
		} else if (nerd_percent > 60) {
			social_level = "약간 친구 있음";
			comment = "그래도 말은 통하겠네 ㅋㅋ";
		} else if (nerd_percent > 40) {
			social_level = "인싸 중에 숨은 찐따";
			comment = "밖에선 인싸인 척하지만 방에선..?";
		} else {
			social_level = "이 녀석 인싸네?";
			comment = "여기 왜 왔냐 인싸야;;";
		}

		setResult({ nerd_percent, otaku_power, social_level, comment });
	};

	const handleShare = async () => {
		if (!navigator.share) {
			alert("공유 기능이 이 브라우저에서 지원되지 않아요 ㅠㅠ");
			return;
		}
		await navigator.share({
			title: "내 찐따력은...?",
			text: `내 찐따력은 ${result.nerd_percent}% / 오타쿠력 ${result.otaku_power}%! 너도 측정해봐!`,
			url: window.location.href,
		});
	};

	const handleCapture = async () => {
		if (resultRef.current) {
			const canvas = await html2canvas(resultRef.current);
			const link = document.createElement("a");
			link.download = "nerd_score_result.png";
			link.href = canvas.toDataURL();
			link.click();
		}
	};

	return (
		<div className="nerd-container">
			<div className="nerd-box">
				<h1 className="nerd-title">찐따력 측정기 🔍</h1>
				<p className="nerd-sub">너의 숨겨진 오타쿠력과 사회성 레벨을 알아보자!</p>

				{questions.map((q) => (
					<div key={q.id} className="nerd-question">
						<label>{q.question}</label>
						<select onChange={(e) => handleChange(q.id, e.target.value)}>
							<option value="">선택하세요</option>
							{q.options.map((opt, idx) => (
								<option key={idx} value={opt}>
									{opt}
								</option>
							))}
						</select>
					</div>
				))}

				<button onClick={calculateScore} className="nerd-submit">
					제출하기
				</button>

				{result && (
					<div ref={resultRef} className="nerd-result">
						<h2>결과 😎</h2>
						<p>
							찐따력: <strong>{result.nerd_percent}%</strong>
						</p>
						<p>
							오타쿠력: <strong>{result.otaku_power}%</strong>
						</p>
						<p>
							사회성 레벨: <strong>{result.social_level}</strong>
						</p>
						<p className="nerd-comment">"{result.comment}"</p>
					</div>
				)}

				{result && (
					<div className="nerd-buttons">
						<button onClick={handleShare}>📲 공유하기</button>
						<button onClick={handleCapture}>🖼️ 결과 저장</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default NerdScoreTest;
