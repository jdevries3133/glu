export default function PrivacyPolicy() {
  return (
    <div className="flex items-center justify-center">
      <div className="prose m-4 rounded bg-gray-200 p-4">
        <p>This is a COPPA compliant web application.</p>
        <p>
          This is a free an open source project. We maintain a detailed
          frequently-updated design document detailing exactly how we secure
          childrens&apos; data. I have tried to make it readable for
          non-technical people, and you should feel free to complain loudly if
          anything in there is confusing, and I will fix it!
        </p>
        <p>
          Our privacy plan{" "}
          <a href="https://github.com/jdevries3133/glu/blob/main/COPPA.md">
            is available on GitHub; click here to view it.
          </a>
        </p>
        <p>
          <a href="https://github.com/jdevries3133/glu/issues/new">
            Click here to submit a message to me
          </a>{" "}
          if anything in that document is unclear.
        </p>
      </div>
    </div>
  );
}
