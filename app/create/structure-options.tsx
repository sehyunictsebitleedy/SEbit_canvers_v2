"use client";

import { useMemo, useState } from "react";
import { buildMenus } from "@/lib/canvers/menus";
import { BOARD_TYPE_LABELS, type BoardConfig, type BoardType, type NavLayout } from "@/lib/canvers/types";

const boardTypeEntries = Object.entries(BOARD_TYPE_LABELS) as [BoardType, string][];

const chartOptions = [
  { value: "bar", label: "막대", description: "항목별 수치 비교" },
  { value: "pie", label: "원형", description: "전체 구성 비율" },
  { value: "donut", label: "도넛", description: "비중과 구성 비교" }
] as const;

const MAX_BOARDS = 6;

const defaultBoardName = (type: BoardType, index: number) =>
  index === 0 ? BOARD_TYPE_LABELS[type] : `${BOARD_TYPE_LABELS[type]} ${index + 1}`;

export function StructureOptions() {
  const [useMainVisual, setUseMainVisual] = useState(true);
  const [boards, setBoards] = useState<BoardConfig[]>([
    { name: "공지사항", type: "notice" },
    { name: "문의", type: "inquiry" }
  ]);
  const [useCharts, setUseCharts] = useState(true);
  const [showCalendar, setShowCalendar] = useState(true);
  const [navLayout, setNavLayout] = useState<NavLayout>("side");
  const [menuOverrides, setMenuOverrides] = useState<Record<string, string>>({});

  const menus = useMemo(() => buildMenus(boards), [boards]);

  function setBoardCount(next: number) {
    setBoards((prev) => {
      if (next <= prev.length) {
        return prev.slice(0, next);
      }
      const added: BoardConfig[] = [];
      for (let index = prev.length; index < next; index += 1) {
        added.push({ name: defaultBoardName("general", index), type: "general" });
      }
      return [...prev, ...added];
    });
  }

  function updateBoard(index: number, patch: Partial<BoardConfig>) {
    setBoards((prev) => prev.map((board, i) => (i === index ? { ...board, ...patch } : board)));
  }

  return (
    <>
      <input type="hidden" name="boardCount" value={boards.length} />
      <input type="hidden" name="useMainVisual" value={useMainVisual ? "on" : "off"} />
      <input type="hidden" name="useCharts" value={useCharts ? "on" : "off"} />
      <input type="hidden" name="showCalendar" value={showCalendar ? "on" : "off"} />
      <input type="hidden" name="navLayout" value={navLayout} />

      <section className="wizard-step">
        <div className="wizard-step-head">
          <span>01</span>
          <div>
            <h2>메인 비주얼</h2>
            <p>첫 화면 상단에 큰 비주얼 배너를 둘지 선택합니다.</p>
          </div>
        </div>
        <div className="wizard-toggle-cards">
          <label className={`wizard-toggle-card ${useMainVisual ? "is-active" : ""}`}>
            <input type="radio" checked={useMainVisual} onChange={() => setUseMainVisual(true)} />
            <span>사용함</span>
            <small>상단에 소개 문구와 이미지 영역이 있는 히어로 배너를 넣습니다.</small>
          </label>
          <label className={`wizard-toggle-card ${!useMainVisual ? "is-active" : ""}`}>
            <input type="radio" checked={!useMainVisual} onChange={() => setUseMainVisual(false)} />
            <span>사용 안 함</span>
            <small>바로 현황 요약과 게시판으로 시작하는 대시보드형 첫 화면입니다.</small>
          </label>
        </div>
      </section>

      <section className="wizard-step">
        <div className="wizard-step-head">
          <span>02</span>
          <div>
            <h2>게시판</h2>
            <p>사용할 게시판 개수와 각 게시판의 종류를 정합니다.</p>
          </div>
        </div>
        <label className="field">
          <span>게시판 개수</span>
          <select
            value={boards.length}
            onChange={(event) => setBoardCount(Number(event.target.value))}
          >
            {Array.from({ length: MAX_BOARDS + 1 }, (_, count) => (
              <option key={count} value={count}>
                {count}개
              </option>
            ))}
          </select>
        </label>

        <div className="wizard-board-list">
          {boards.map((board, index) => (
            <div className="wizard-board-row" key={index}>
              <label className="field">
                <span>게시판 {index + 1} 이름</span>
                <input
                  value={board.name}
                  onChange={(event) => updateBoard(index, { name: event.target.value })}
                  placeholder={BOARD_TYPE_LABELS[board.type]}
                />
              </label>
              <label className="field">
                <span>종류</span>
                <select
                  value={board.type}
                  onChange={(event) => updateBoard(index, { type: event.target.value as BoardType })}
                >
                  {boardTypeEntries.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <input type="hidden" name={`board-${index}-name`} value={board.name} />
              <input type="hidden" name={`board-${index}-type`} value={board.type} />
            </div>
          ))}
          {boards.length === 0 ? <p className="field-hint">게시판 없이 현황 위젯만 있는 페이지로 생성됩니다.</p> : null}
        </div>
      </section>

      <section className="wizard-step">
        <div className="wizard-step-head">
          <span>03</span>
          <div>
            <h2>그래프 · 달력</h2>
            <p>현황 영역에 넣을 위젯을 선택합니다.</p>
          </div>
        </div>
        <label className="wizard-inline-toggle">
          <input type="checkbox" checked={useCharts} onChange={(event) => setUseCharts(event.target.checked)} />
          <span>그래프 사용</span>
        </label>
        {useCharts ? (
          <div className="chart-type-options">
            {chartOptions.map((chart, index) => (
              <label className="chart-type-card" key={chart.value}>
                <input name="chartTypes" type="checkbox" value={chart.value} defaultChecked={index < 2} />
                <span className={`chart-option-preview chart-option-${chart.value}`} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <strong>{chart.label}</strong>
                <small>{chart.description}</small>
              </label>
            ))}
          </div>
        ) : null}
        <label className="wizard-inline-toggle">
          <input type="checkbox" checked={showCalendar} onChange={(event) => setShowCalendar(event.target.checked)} />
          <span>달력 위젯 사용</span>
        </label>
      </section>

      <section className="wizard-step">
        <div className="wizard-step-head">
          <span>04</span>
          <div>
            <h2>메뉴</h2>
            <p>메뉴 위치를 정하고, 자동 구성된 메뉴 이름을 수정합니다.</p>
          </div>
        </div>

        <div className="wizard-toggle-cards">
          <label className={`wizard-toggle-card ${navLayout === "side" ? "is-active" : ""}`}>
            <input type="radio" checked={navLayout === "side"} onChange={() => setNavLayout("side")} />
            <span>왼쪽 메뉴</span>
            <small>화면 왼쪽에 세로 사이드바로 메뉴를 둡니다. 관리자 화면에 잘 맞습니다.</small>
          </label>
          <label className={`wizard-toggle-card ${navLayout === "top" ? "is-active" : ""}`}>
            <input type="radio" checked={navLayout === "top"} onChange={() => setNavLayout("top")} />
            <span>상단 메뉴</span>
            <small>화면 상단에 가로로 메뉴를 둡니다. 일반 홈페이지에 잘 맞습니다.</small>
          </label>
        </div>

        <div className="wizard-menu-list">
          {menus.map((menu, index) => (
            <label className="field" key={menu.href}>
              <span>메뉴 {index + 1}</span>
              <input
                name={`menu-${index}-label`}
                value={menuOverrides[menu.href] ?? menu.label}
                onChange={(event) =>
                  setMenuOverrides((prev) => ({ ...prev, [menu.href]: event.target.value }))
                }
              />
            </label>
          ))}
        </div>
      </section>
    </>
  );
}
