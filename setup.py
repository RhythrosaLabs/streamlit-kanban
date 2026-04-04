from setuptools import setup, find_packages

setup(
    name="streamlit-kanban",
    version="0.1.1",
    author="Dan Sheils",
    author_email="",
    description="A drag-and-drop Kanban board component for Streamlit",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/RhythrosaLabs/streamlit-kanban",
    packages=find_packages(),
    include_package_data=True,
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.8",
    install_requires=["streamlit>=1.28.0"],
)
