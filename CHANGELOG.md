# Changelog

## 0.3.3

- Add PyPI project links: Homepage, Source, live component demo, and the other Streamlit components
- Add author email so the PyPI page has a real contact
- Add search keywords and Streamlit/developer/widget classifiers for PyPI discoverability
- README: cross-link the other six Streamlit components and the live demo
- README: add a custom-components / consulting contact section

## 0.3.2

- Update SVG screenshot to match actual app UI

## 0.2.0

- Wire up Streamlit bidirectional communication (setComponentReady, RENDER_EVENT, setComponentValue)
- Initialize board columns from Python `st_kanban(columns)` args
- Return updated columns to Python on every drag/add/edit/delete
- Add `Framework :: Streamlit` classifier to setup.py
- Add project_urls (Bug Tracker, Changelog) to setup.py
- Fix .gitignore: stop ignoring frontend build dir (required for PyPI)

## 0.1.1

- Set author to Dan Sheils

## 0.1.0

- Initial release

