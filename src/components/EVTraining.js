import React, { useState } from "react";

const EVTraining = () => {
  const [selectedStat, setSelectedStat] = useState(null);
  const [statsValues, setStatsValues] = useState({
    HP: 0,
    ATK: 0,
    DEF: 0,
    "Sp. ATK": 0,
    "Sp. DEF": 0,
    SPEED: 0,
  });
  const [tool, setTool] = useState(null);
  const [pokerus, setPokerus] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const maxEVs = 510;

  const totalEVs = Object.values(statsValues).reduce(
    (total, current) => total + current,
    0
  );
  const evPercent = Math.min(100, (totalEVs / maxEVs) * 100); // Cap at 100%

  const stats = ["HP", "ATK", "DEF", "Sp. ATK", "Sp. DEF", "SPEED"];
  const itemsEffects = {
    "Power Weight": "HP",
    "Power Bracer": "ATK",
    "Power Belt": "DEF",
    "Power Lens": "Sp. ATK",
    "Power Band": "Sp. DEF",
    "Power Anklet": "SPEED",
  };

  const handleStatSelect = (stat) => {
    setSelectedStat(stat);
  };

  const handleToolSelect = (selectedTool) => {
    setTool(selectedTool);
  };

  const togglePokerus = () => {
    setPokerus(!pokerus);
  };

  const handleEVChange = (change) => {
    if (selectedStat && totalEVs < maxEVs) {
      const multiplier = (tool === "Macho Brace" ? 2 : 1) * (pokerus ? 2 : 1);
      let effectiveChange = change * multiplier;
      if (totalEVs + effectiveChange > maxEVs) {
        effectiveChange = maxEVs - totalEVs; // Cap the change to not exceed maxEVs
      }

      const newValues = { ...statsValues };

      // Apply base change to the selected stat
      newValues[selectedStat] += effectiveChange;

      // Apply additional effects from power items
      if (tool in itemsEffects) {
        const additional = Math.min(
          maxEVs - totalEVs - effectiveChange,
          4 * multiplier
        );
        newValues[itemsEffects[tool]] += additional;
      }

      setStatsValues(newValues);
    }
  };

  const resetEVs = () => {
    setStatsValues({
      HP: 0,
      ATK: 0,
      DEF: 0,
      "Sp. ATK": 0,
      "Sp. DEF": 0,
      SPEED: 0,
    });
    setShowResetModal(false);
  };

  return (
    <div className="container mt-5">
      <br />
      <div className="card w-100 shadow">
        <div className="card-body">
          <h5 className="card-title text-center">Current EV Training</h5>
          <div className="progress-container">
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{ width: `${evPercent}%` }}
                aria-valuenow={evPercent}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              <div className="progress-text">
                {totalEVs}/{maxEVs}
              </div>
            </div>
          </div>
          <div className="stats-container">
            {stats.map((stat) => (
              <div key={stat} className="stat-block">
                <div className="h4">
                  {stat}: {statsValues[stat]}
                </div>
                <button
                  className={`btn ${
                    selectedStat === stat ? "btn-warning" : "btn-secondary"
                  }`}
                  onClick={() => handleStatSelect(stat)}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <p>Are you using one of the following:</p>
            {[
              "Macho Brace",
              "Power Weight",
              "Power Bracer",
              "Power Belt",
              "Power Lens",
              "Power Band",
              "Power Anklet",
            ].map((item) => (
              <div key={item} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="toolOption"
                  id={item}
                  value={item}
                  checked={tool === item}
                  onChange={() => handleToolSelect(item)}
                />
                <label className="form-check-label" htmlFor={item}>
                  {item}
                </label>
              </div>
            ))}
          </div>
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="pokerus"
              checked={pokerus}
              onChange={togglePokerus}
            />
            <label className="form-check-label" htmlFor="pokerus">
              My Pokémon has Pokérus
            </label>
          </div>
          <div className="mt-3">
            <div className="d-flex justify-content-center flex-wrap">
              {["+1", "+2", "+3"].map((value) => (
                <div key={value} className="p-2">
                  <button
                    className="btn btn-lg btn-primary mb-2 mb-md-0"
                    onClick={() => handleEVChange(parseInt(value, 10))}
                  >
                    {value}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-danger"
              onClick={() => setShowResetModal(true)}
            >
              Reset Pokémon EVs
            </button>
          </div>
          {/* Bootstrap Modal */}
          {showResetModal && (
            <div
              className="modal show"
              style={{ display: "block" }}
              tabIndex="-1"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Reset</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowResetModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to reset your Pokémon's EVs?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowResetModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={resetEVs}
                    >
                      Reset EVs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EVTraining;
