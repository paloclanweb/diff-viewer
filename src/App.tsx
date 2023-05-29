import { useState } from "react";
import "./App.css";
import ReactDiffViewer from "react-diff-viewer-continued";

const oldCode = `The product card and info does not need all those props, also this can grow and be even more unmaintainable, it is not scalable or reusable at all.

Maybe the first thing that comes to your mind is to use context in this case, it can be a good solution, however there is a better way to get rid of the props and avoid this, it is called the composition pattern.`;
const newCode = `The product card and info does not need all those props, also this can grow and be even more unmaintainable, it is not scalable or reusable at all.

Maybe the first thing that comes to your mind is to use context in this case, it can be a good solution, however there is a better way to get rid of the props and avoid this, it is called the composition pattern.`;

function App() {

  enum DiffMethod {
    CHARS = "diffChars",
    WORDS = "diffWords",
    WORDS_WITH_SPACE = "diffWordsWithSpace",
    LINES = "diffLines",
    TRIMMED_LINES = "diffTrimmedLines",
    SENTENCES = "diffSentences",
    CSS = "diffCss",
  }
  const [compareMethod, setCompareMethod] = useState(DiffMethod.SENTENCES);
  const [valueOld, setValueOld] = useState(oldCode);
  const [valueNew, setValueNew] = useState(newCode);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as DiffMethod;
    setCompareMethod(
      Object.values(DiffMethod).includes(value) ? value : DiffMethod.SENTENCES
    );
  };

  return (
    <>
      <div>
        <div>
          <header className="header">
            <div className="input">
              <textarea
                className="textArea"
                rows={10}
                placeholder="old text..."
                value={valueOld}
                onChange={(
                  e:
                    | React.ChangeEvent<HTMLInputElement>
                    | React.ChangeEvent<HTMLTextAreaElement>
                ) => setValueOld(e.target.value)}
              />
              <textarea
                className="textarea"
                rows={10}
                placeholder="new text..."
                value={valueNew}
                onChange={(
                  e:
                    | React.ChangeEvent<HTMLInputElement>
                    | React.ChangeEvent<HTMLTextAreaElement>
                ) => setValueNew(e.target.value)}
              />
            </div>
          </header>

          <ReactDiffViewer
            oldValue={valueOld}
            newValue={valueNew}
            splitView={true}
            compareMethod={compareMethod}
          />
          <select value={compareMethod} onChange={handleChange}>
            {/* {Object.entries(DiffMethod).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))} */}
            <option key={"WORDS"} value={"diffWords"}>
              WORDS
            </option>
            <option key={"SENTENCES"} value={"diffSentences"}>
              SENTENCES
            </option>
          </select>
        </div>
      </div>
    </>
  );
}

export default App;
