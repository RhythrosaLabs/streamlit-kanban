from setuptools import setup, find_packages

setup(
    name="streamlit-kanban",
    version="0.3.3",
    author="Dan Sheils",
    author_email="daniel.j.sheils@gmail.com",
    description="A drag-and-drop Kanban board component for Streamlit",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/RhythrosaLabs/streamlit-kanban",
    project_urls={
        "Homepage": "https://rhythrosalabs.github.io",
        "Source": "https://github.com/RhythrosaLabs/streamlit-kanban",
        "Bug Tracker": "https://github.com/RhythrosaLabs/streamlit-kanban/issues",
        "Changelog": "https://github.com/RhythrosaLabs/streamlit-kanban/blob/main/CHANGELOG.md",
        "Other Streamlit components": "https://pypi.org/user/rhythrosa/",
        "Live component demo": "https://demo-components.streamlit.app",
    },
    keywords=[
        "streamlit", "streamlit-component", "kanban", "kanban-board",
        "drag-and-drop", "task-management", "project-management", "dashboard",
    ],
    packages=find_packages(),
    include_package_data=True,
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Framework :: Streamlit",
        "Intended Audience :: Developers",
        "Topic :: Software Development :: Widgets",
        "Topic :: Office/Business :: Scheduling",
    ],
    python_requires=">=3.8",
    install_requires=["streamlit>=1.28.0"],
)
