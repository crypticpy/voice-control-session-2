/* ============================================
   Policy Plain Language Converter
   Austin Public Health — City of Austin
   Client-Side Logic
   ============================================ */

(function () {
  "use strict";

  // ------------------------------------------
  // Module-level state
  // ------------------------------------------
  var lastConversionResult = null;

  // ------------------------------------------
  // DOM references (populated on DOMContentLoaded)
  // ------------------------------------------
  var els = {};

  function cacheElements() {
    // Input
    els.policyInput = document.getElementById("policyInput");
    els.charCount = document.getElementById("charCount");
    els.convertBtn = document.getElementById("convertBtn");

    // Loading
    els.loadingSection = document.getElementById("loadingSection");
    els.loadingMessage = document.getElementById("loadingMessage");

    // Error
    els.errorSection = document.getElementById("errorSection");
    els.errorMessage = document.getElementById("errorMessage");
    els.errorSuggestion = document.getElementById("errorSuggestion");

    // Warning
    els.warningSection = document.getElementById("warningSection");

    // AI Disclaimer
    els.aiDisclaimer = document.getElementById("aiDisclaimer");

    // Metadata
    els.metadataBar = document.getElementById("metadataBar");
    els.metaCategoryValue = document.getElementById("metaCategoryValue");
    els.metaDateValue = document.getElementById("metaDateValue");
    els.metaConfidenceValue = document.getElementById("metaConfidenceValue");
    els.metaWordCountValue = document.getElementById("metaWordCountValue");

    // Output / Tabs
    els.outputSection = document.getElementById("outputSection");
    els.tabNav = document.getElementById("tabNav");
    els.tabIndicator = document.getElementById("tabIndicator");

    // Executive Summary
    els.execTitle = document.getElementById("execTitle");
    els.execBottomLineText = document.getElementById("execBottomLineText");
    els.execRiskBadge = document.getElementById("execRiskBadge");
    els.execSummary = document.getElementById("execSummary");
    els.execKeyPoints = document.getElementById("execKeyPoints");
    els.execFiscalImpact = document.getElementById("execFiscalImpact");
    els.execRecommendation = document.getElementById("execRecommendation");

    // Staff Briefing
    els.staffTitle = document.getElementById("staffTitle");
    els.staffOverview = document.getElementById("staffOverview");
    els.staffKeyChangesBody = document.getElementById("staffKeyChangesBody");
    els.staffImplementationSteps = document.getElementById(
      "staffImplementationSteps",
    );
    els.staffTimeline = document.getElementById("staffTimeline");
    els.staffAffectedTeams = document.getElementById("staffAffectedTeams");

    // Public Version
    els.publicTitle = document.getElementById("publicTitle");
    els.publicWhatIsThis = document.getElementById("publicWhatIsThis");
    els.publicWhyItMatters = document.getElementById("publicWhyItMatters");
    els.publicKeyTakeaways = document.getElementById("publicKeyTakeaways");
    els.publicWhatYouCanDo = document.getElementById("publicWhatYouCanDo");
    els.publicWhereToGetHelp = document.getElementById("publicWhereToGetHelp");

    // Action buttons
    els.exportActions = document.getElementById("exportActions");
    els.exportPdfBtn = document.getElementById("exportPdfBtn");

    // Tab panels
    els.panelExecutive = document.getElementById("panelExecutive");
    els.panelStaff = document.getElementById("panelStaff");
    els.panelPublic = document.getElementById("panelPublic");
  }

  // ------------------------------------------
  // Character count
  // ------------------------------------------
  function formatNumber(n) {
    return Number(n).toLocaleString();
  }

  function updateCharCount() {
    var len = els.policyInput.value.length;
    els.charCount.textContent = formatNumber(len) + " / 100,000";
  }

  // ------------------------------------------
  // Client-side validation
  // ------------------------------------------
  function validateInput(text) {
    var trimmed = text.trim();

    if (trimmed.length === 0) {
      return {
        valid: false,
        message: "Please paste policy text before submitting.",
      };
    }
    if (trimmed.length < 50) {
      return {
        valid: false,
        message:
          "The text is too short. Please provide at least a full paragraph of policy text.",
      };
    }
    if (trimmed.length > 100000) {
      return {
        valid: false,
        message:
          "Text exceeds 100,000 characters. Please submit a shorter section.",
      };
    }

    return { valid: true, text: trimmed };
  }

  // ------------------------------------------
  // Error display helpers
  // ------------------------------------------
  function showError(message, suggestion) {
    els.errorMessage.textContent = message;
    els.errorSuggestion.textContent = suggestion || "";
    els.errorSection.classList.remove("hidden");
    els.loadingSection.classList.add("hidden");
    els.outputSection.classList.add("hidden");
    els.metadataBar.classList.add("hidden");
    els.exportActions.classList.add("hidden");
    els.aiDisclaimer.classList.add("hidden");
    els.warningSection.classList.add("hidden");
  }

  function hideError() {
    els.errorSection.classList.add("hidden");
  }

  // ------------------------------------------
  // Loading state helpers
  // ------------------------------------------
  var loadingMessages = [
    "Analyzing policy text for three audiences...",
    "Identifying key points and fiscal impact...",
    "Generating executive summary...",
    "Preparing staff briefing...",
    "Writing plain language public version...",
    "Structuring output and metadata...",
  ];
  var loadingMsgIndex = 0;
  var loadingInterval = null;

  function cycleLoadingMessage() {
    loadingMsgIndex = (loadingMsgIndex + 1) % loadingMessages.length;
    if (els.loadingMessage) {
      els.loadingMessage.style.opacity = "0";
      setTimeout(function () {
        els.loadingMessage.textContent = loadingMessages[loadingMsgIndex];
        els.loadingMessage.style.opacity = "1";
      }, 200);
    }
  }

  function showLoading() {
    els.loadingSection.classList.remove("hidden");
    els.outputSection.classList.add("hidden");
    els.metadataBar.classList.add("hidden");
    els.exportActions.classList.add("hidden");
    els.aiDisclaimer.classList.add("hidden");
    els.warningSection.classList.add("hidden");
    hideError();

    // Start cycling loading messages
    loadingMsgIndex = 0;
    if (els.loadingMessage) {
      els.loadingMessage.textContent = loadingMessages[0];
      els.loadingMessage.style.transition = "opacity 0.2s ease";
    }
    loadingInterval = setInterval(cycleLoadingMessage, 3000);
  }

  function hideLoading() {
    els.loadingSection.classList.add("hidden");
    if (loadingInterval) {
      clearInterval(loadingInterval);
      loadingInterval = null;
    }
  }

  // ------------------------------------------
  // Output rendering
  // ------------------------------------------

  function clearList(listEl) {
    while (listEl.firstChild) {
      listEl.removeChild(listEl.firstChild);
    }
  }

  function populateList(listEl, items) {
    clearList(listEl);
    if (!items || !items.length) return;
    items.forEach(function (text) {
      var li = document.createElement("li");
      li.textContent = text;
      listEl.appendChild(li);
    });
  }

  function getRiskClass(level) {
    if (!level) return "";
    var lower = level.toLowerCase();
    if (lower === "critical") return "risk-critical";
    if (lower === "high") return "risk-high";
    if (lower === "medium") return "risk-medium";
    if (lower === "low") return "risk-low";
    return "";
  }

  function getConfidenceClass(level) {
    if (!level) return "";
    var lower = level.toLowerCase();
    if (lower === "high") return "confidence-high";
    if (lower === "medium") return "confidence-medium";
    if (lower === "low") return "confidence-low";
    return "";
  }

  function renderExecutiveSummary(data) {
    els.execTitle.textContent = data.title || "Executive Summary";
    els.execBottomLineText.textContent = data.bottomLine || "";

    els.execRiskBadge.textContent = data.riskLevel || "--";
    els.execRiskBadge.className = "risk-badge";
    var riskClass = getRiskClass(data.riskLevel);
    if (riskClass) {
      els.execRiskBadge.classList.add(riskClass);
    }

    els.execSummary.textContent = data.summary || "";
    populateList(els.execKeyPoints, data.keyPoints);
    els.execFiscalImpact.textContent =
      data.fiscalImpact || "Not specified in source document";
    els.execRecommendation.textContent = data.recommendation || "";
  }

  function renderStaffBriefing(data) {
    els.staffTitle.textContent = data.title || "Staff Briefing";
    els.staffOverview.textContent = data.overview || "";

    clearList(els.staffKeyChangesBody);
    if (data.keyChanges && data.keyChanges.length) {
      data.keyChanges.forEach(function (change) {
        var tr = document.createElement("tr");

        var tdArea = document.createElement("td");
        tdArea.textContent = change.area || "";
        tr.appendChild(tdArea);

        var tdCurrent = document.createElement("td");
        tdCurrent.textContent = change.currentState || "";
        tr.appendChild(tdCurrent);

        var tdNew = document.createElement("td");
        tdNew.textContent = change.newState || "";
        tr.appendChild(tdNew);

        var tdAction = document.createElement("td");
        tdAction.textContent = change.actionRequired || "";
        tr.appendChild(tdAction);

        els.staffKeyChangesBody.appendChild(tr);
      });
    }

    populateList(els.staffImplementationSteps, data.implementationSteps);
    els.staffTimeline.textContent = data.timeline || "Not specified";

    clearList(els.staffAffectedTeams);
    if (data.affectedTeams && data.affectedTeams.length) {
      data.affectedTeams.forEach(function (team) {
        var chip = document.createElement("span");
        chip.className = "team-chip";
        chip.textContent = team;
        els.staffAffectedTeams.appendChild(chip);
      });
    }
  }

  function renderPublicVersion(data) {
    els.publicTitle.textContent = data.title || "Public Version";
    els.publicWhatIsThis.textContent = data.whatIsThis || "";
    els.publicWhyItMatters.textContent = data.whyItMatters || "";
    populateList(els.publicKeyTakeaways, data.keyTakeaways);
    populateList(els.publicWhatYouCanDo, data.whatYouCanDo);
    els.publicWhereToGetHelp.textContent = data.whereToGetHelp || "";
  }

  function renderMetadata(meta) {
    els.metaCategoryValue.textContent = meta.policyCategory || "--";

    if (meta.effectiveDate) {
      try {
        var d = new Date(meta.effectiveDate);
        els.metaDateValue.textContent = d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch (e) {
        els.metaDateValue.textContent = meta.effectiveDate;
      }
    } else {
      els.metaDateValue.textContent = "Not specified";
    }

    els.metaConfidenceValue.textContent = meta.confidence || "--";
    els.metaConfidenceValue.className = "metadata-value badge";
    var confClass = getConfidenceClass(meta.confidence);
    if (confClass) {
      els.metaConfidenceValue.classList.add(confClass);
    }

    els.metaWordCountValue.textContent = meta.sourceWordCount
      ? formatNumber(meta.sourceWordCount) + " words"
      : "-- words";
  }

  function renderOutput(data) {
    renderExecutiveSummary(data.executiveSummary);
    renderStaffBriefing(data.staffBriefing);
    renderPublicVersion(data.publicVersion);
    renderMetadata(data.metadata);

    // Non-policy warning
    if (data.metadata && data.metadata.inputQuality === "not_policy") {
      els.warningSection.classList.remove("hidden");
    } else {
      els.warningSection.classList.add("hidden");
    }

    // AI disclaimer
    els.aiDisclaimer.classList.remove("hidden");

    // Show output areas
    els.outputSection.classList.remove("hidden");
    els.metadataBar.classList.remove("hidden");
    els.exportActions.classList.remove("hidden");

    // Activate Executive Summary tab by default
    activateTab("executive");

    // Smooth scroll to results
    setTimeout(function () {
      var target = els.aiDisclaimer || els.metadataBar;
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }

  // ------------------------------------------
  // Tab switching with sliding indicator
  // ------------------------------------------

  var tabMap = {
    executive: { tab: "tabExecutive", panel: "panelExecutive" },
    staff: { tab: "tabStaff", panel: "panelStaff" },
    public: { tab: "tabPublic", panel: "panelPublic" },
  };

  function positionTabIndicator(tabBtn) {
    if (!els.tabIndicator || !tabBtn) return;

    // Skip indicator positioning on mobile (when indicator is hidden via CSS)
    if (window.innerWidth <= 768) return;

    var navRect = els.tabNav.getBoundingClientRect();
    var btnRect = tabBtn.getBoundingClientRect();

    var offsetLeft = btnRect.left - navRect.left;
    els.tabIndicator.style.width = btnRect.width + "px";
    els.tabIndicator.style.transform = "translateX(" + offsetLeft + "px)";
  }

  function activateTab(tabKey) {
    var tabKeys = Object.keys(tabMap);
    var activeBtn = null;

    tabKeys.forEach(function (key) {
      var tabBtn = document.getElementById(tabMap[key].tab);
      var panel = document.getElementById(tabMap[key].panel);

      if (key === tabKey) {
        tabBtn.classList.add("active");
        tabBtn.setAttribute("aria-selected", "true");
        panel.classList.add("active");
        panel.removeAttribute("hidden");
        activeBtn = tabBtn;
      } else {
        tabBtn.classList.remove("active");
        tabBtn.setAttribute("aria-selected", "false");
        panel.classList.remove("active");
        panel.setAttribute("hidden", "");
      }
    });

    // Position the sliding indicator
    if (activeBtn) {
      positionTabIndicator(activeBtn);
    }
  }

  function handleTabClick(e) {
    var btn = e.target.closest(".tab-btn");
    if (!btn) return;
    var tabKey = btn.getAttribute("data-tab");
    if (tabKey) {
      activateTab(tabKey);
    }
  }

  // ------------------------------------------
  // Form submission
  // ------------------------------------------

  function handleSubmit() {
    var raw = els.policyInput.value;
    var validation = validateInput(raw);

    if (!validation.valid) {
      showError(validation.message);
      return;
    }

    els.convertBtn.disabled = true;
    hideError();
    showLoading();

    fetch("/api/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: validation.text }),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json().then(function (data) {
            hideLoading();
            els.convertBtn.disabled = false;
            lastConversionResult = data;
            renderOutput(data);
          });
        }

        return response
          .json()
          .then(function (body) {
            hideLoading();
            els.convertBtn.disabled = false;
            var msg =
              body && body.error && body.error.message
                ? body.error.message
                : "Something went wrong. Please try again.";
            showError(msg);
          })
          .catch(function () {
            hideLoading();
            els.convertBtn.disabled = false;
            showError("Something went wrong. Please try again.");
          });
      })
      .catch(function () {
        hideLoading();
        els.convertBtn.disabled = false;
        showError(
          "Unable to connect to the server. Please check your connection and try again.",
        );
      });
  }

  // ------------------------------------------
  // Clipboard copy
  // ------------------------------------------

  function getPlainTextFromPanel(panelKey) {
    var panelId = tabMap[panelKey] ? tabMap[panelKey].panel : null;
    if (!panelId) return "";

    var panel = document.getElementById(panelId);
    if (!panel) return "";

    var card = panel.querySelector(".output-card");
    if (!card) return "";

    return card.textContent.trim();
  }

  function copyToClipboard(text, btn) {
    var originalHTML = btn.innerHTML;

    function onSuccess() {
      // Replace with checkmark icon + "Copied!"
      btn.innerHTML =
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!';
      btn.classList.add("copied");
      setTimeout(function () {
        btn.innerHTML = originalHTML;
        btn.classList.remove("copied");
      }, 3000);
    }

    function onFail() {
      try {
        var tempArea = document.createElement("textarea");
        tempArea.value = text;
        tempArea.style.position = "fixed";
        tempArea.style.left = "-9999px";
        tempArea.style.top = "-9999px";
        document.body.appendChild(tempArea);
        tempArea.focus();
        tempArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempArea);
        onSuccess();
      } catch (err) {
        // Silent fail
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onSuccess).catch(onFail);
    } else {
      onFail();
    }
  }

  function handleCopyClick(e) {
    var btn = e.target.closest(".btn-copy");
    if (!btn) return;

    var copyTarget = btn.getAttribute("data-copy");
    if (!copyTarget) return;

    var text = getPlainTextFromPanel(copyTarget);
    copyToClipboard(text, btn);
  }

  // ------------------------------------------
  // PDF export
  // ------------------------------------------

  function handleExportPdf() {
    if (!lastConversionResult) return;

    els.exportPdfBtn.disabled = true;

    fetch("/api/export-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lastConversionResult),
    })
      .then(function (response) {
        if (!response.ok) {
          return response
            .json()
            .then(function (body) {
              els.exportPdfBtn.disabled = false;
              var msg =
                body && body.error && body.error.message
                  ? body.error.message
                  : "Failed to generate PDF. Please try again.";
              showError(msg);
            })
            .catch(function () {
              els.exportPdfBtn.disabled = false;
              showError("Failed to generate PDF. Please try again.");
            });
        }

        return response.blob().then(function (blob) {
          els.exportPdfBtn.disabled = false;
          var url = URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url;
          a.download = "policy-report.pdf";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        });
      })
      .catch(function () {
        els.exportPdfBtn.disabled = false;
        showError(
          "Unable to connect to the server. Please check your connection and try again.",
        );
      });
  }

  // ------------------------------------------
  // Initialize on DOMContentLoaded
  // ------------------------------------------

  document.addEventListener("DOMContentLoaded", function () {
    cacheElements();

    // Character count on input
    els.policyInput.addEventListener("input", updateCharCount);

    // Form submission
    els.convertBtn.addEventListener("click", handleSubmit);

    // Tab switching via event delegation
    els.tabNav.addEventListener("click", handleTabClick);

    // Copy buttons via event delegation on output section
    els.outputSection.addEventListener("click", handleCopyClick);

    // PDF export
    els.exportPdfBtn.addEventListener("click", handleExportPdf);

    // Initialize character count display
    updateCharCount();

    // Reposition tab indicator on window resize
    window.addEventListener("resize", function () {
      var activeTab = els.tabNav.querySelector(".tab-btn.active");
      if (activeTab) {
        positionTabIndicator(activeTab);
      }
    });
  });
})();
