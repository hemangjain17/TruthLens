import React, { useEffect } from "react";
import { useState } from "react";
import ApexCharts from "apexcharts";
// import image from "./images/InpImg.png";
// import image2 from "./images/fakeimage.jpg";
// import video from "./images/diljitdosanghpmmodi.mp4";
// import audio from "./images/diljitdosanjhaudio.mp3";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/authContext";
import ReactMarkdown from "react-markdown";

const TrendAnalysis = () => {
  const [latestData, setLatestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  const email = currentUser.email; // Replace with actual user email from auth

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await fetch(
          `https://localhost:3000/get-latest-data?email=${email}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setLatestData(result.data);
        console.log(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestData();
  }, []);
  const reports = [
    {
      reporter: "Image",
      category: "Diljith Dosanjh meets PM Modi",
      status: "True News",
      statusColor: "green",
    },
    {
      reporter: "Image",
      category: "UFO spotted in open sky ",
      status: "False News",
      statusColor: "red",
    },
    {
      reporter: "Video",
      category: "Farmers are angry with Diljit Dosanjh",
      status: "True News",
      statusColor: "green",
    },
    {
      reporter: "Audio",
      category:
        "दिल्ली में प्रधानमंत्री मोदी से सिंगर दिलजीत दोसांझ की मुलाकात हुई है।",
      status: "True News",
      statusColor: "green",
    },
  ];

  useEffect(() => {
    const patternOptions = {
      chart: {
        type: "donut",
        height: 256,
      },
      series: [44, 55, 41, 17, 23],
      labels: [
        "False Information",
        "Correct Information",
        "Hate Speech",
        "Sensitive Content",
        "Clickbait",
      ],
      colors: ["#0ea5e9", "#22c55e", "#a855f7", "#64748b", "#f59e0b"],
    };

    const sourceOptions = {
      chart: {
        type: "bar",
        height: 256,
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          data: [44, 55, 41, 64, 22],
        },
      ],
      colors: ["#0ea5e9"],
      xaxis: {
        categories: [
          "DD News",
          "Hindustan Times ",
          "Google News",
          "Fact Check API ",
          "Other",
        ],
      },
    };

    let patternChart, sourceChart;

    try {
      patternChart = new ApexCharts(
        document.querySelector("#pattern-chart"),
        patternOptions
      );
      // patternChart.render();
    } catch (error) {
      console.error("Error initializing charts:", error);
    }
  }, []);

  return (
    <>
      <Sidebar />

      <section id="trend_analysis" className="p-6 ml-60">
        {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-6"> */}
        {/* Trend Overview */}
        {/* Main Reports Area */}
        <div className="bg-white border rounded-lg p-6 mb-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="flex flex-col space-y-6 lg:col-span-2 xl:col-span-3">
            {/* 1st Quadrant: Report Table */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Reports and Analysis
              </h3>
              <div className="overflow-x-auto">
                <table className="w-[100%]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">
                        News Type
                      </th>
                      <th className="text-left py-3 px-4 font-semibold w-[200px]">
                        Insights
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <span>{report.reporter}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 w-[200px] break-words">
                          {report.category}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 bg-${report.statusColor}-100 text-${report.statusColor}-800 rounded-full text-xs`}
                          >
                            {report.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-blue-400">
                          <button className="text-primary-600 hover:text-primary-800">
                            View Report
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Extracted Information</h3>
              <ul className="space-y-5">
                <li className="text-sm">
                  <strong>Named Entity Recognition (NER):</strong>
                  <ul className="pl-4 list-disc">
                    <li><strong>Person:</strong> Diljit Dosanjh, Prime Minister of India</li>
                    <li><strong>Organization:</strong> Government of India, Prime Minister's Office</li>
                  </ul>
                </li>
                <li className="text-sm">
                  <strong>Sentiment Analysis:</strong>
                  <ul className="pl-4 list-disc">
                    <li><strong>Overall Sentiment:</strong> Positive</li>
                  </ul>

                </li>
                <li className="text-sm">
                  <strong>Deepfake and GenAI Image Analysis:</strong>
                  <ul className="pl-4 list-disc">
                    <li><strong>Image Deepfake or Generated by AI:</strong> Fake Image</li>
                    <li><strong>Audio Deepfake:</strong> Real Audio</li>
                  </ul>
                </li>
                <li className="text-sm">
                  <strong>Insights drawn from Graphics:</strong>
                  <ul className="pl-4 list-disc">
                    <li> Breaking News</li>
                    <li> Diljit Dosanjh meets PM Modi</li>
                    <li> Times Now 19 Headlines</li>
                    <li> New Orleans Crash Suspect Dies </li>
                  </ul>
                </li>
                <li className="text-sm">
                  <strong>Insights drawn from Related Links:</strong>
                  <ul className="pl-4 list-disc">
                    <li> PM Modi praised Dosanjh for representing India globally, while Dosanjh expressed admiration for India's greatness and cultural richness.</li>
                    <li> Prime Minister Narendra Modi and Diljit Dosanjh discussed India's vibrancy, music, and yoga during their meeting.
                    </li>
                    <li> Diljit Dosanjh met Prime Minister Narendra Modi, and they discussed topics like music, culture, and his journey to international fame.  </li>
                    <li> PM Modi praised Dosanjh for his multifaceted talent and his ability to blend tradition with creativity. </li>
                  </ul>
                </li>
              </ul>
            </div> */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">User Input Summary</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Text Input:
                  </h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded border">
                    {latestData?.textInput || "No text input provided"}
                  </p>
                </div>

                {latestData?.blogLinks?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Blog Links ({latestData.blogLinks.length}):
                    </h4>
                    <div className="space-y-2">
                      {latestData.blogLinks.map((link, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-3 rounded border"
                        >
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline text-sm break-all"
                          >
                            {link}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {latestData?.videoLinks?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Video Links ({latestData.videoLinks.length}):
                    </h4>
                    <div className="space-y-2">
                      {latestData.videoLinks.map((link, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-3 rounded border"
                        >
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline text-sm break-all"
                          >
                            {link}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {latestData?.uploadedVideos?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Uploaded Videos ({latestData.uploadedVideos.length}):
                    </h4>
                    <div className="space-y-2">
                      {latestData.uploadedVideos.map((video, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-3 rounded border"
                        >
                          <p className="text-sm text-gray-700">
                            <strong>Filename:</strong> {video.filename}
                            <br />
                            <strong>Size:</strong>{" "}
                            {(video.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Raw Input Summary:
                  </h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded border">
                    {latestData?.inputInsights || "No data available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-6 lg:col-span-2 xl:col-span-1">
            {/* 2nd Quadrant: Images */}
            {/* <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Images</h3>
              <div className="flex flex-col gap-4">

                <img
                  src={image}
                  className="rounded-lg w-100 h-100"
                />
                <img
                  src={image2}
                  className="rounded-lg w-100 h-100"
                />

              </div>
            </div> */}

            {/* 3rd Quadrant: Videos */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Uploaded Videos</h3>
              <div className="grid grid-cols-1 gap-4">
                {latestData?.uploadedVideos?.length > 0 ? (
                  latestData.uploadedVideos.map((video, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded border">
                      <p className="text-sm text-gray-700">
                        <strong>Filename:</strong> {video.filename}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Size:</strong>{" "}
                        {(video.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Path:</strong> {video.path}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No videos uploaded.</p>
                )}
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                All Submitted Links
              </h3>

              {/* Video Links Section */}
              {latestData?.videoLinks?.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Video Links ({latestData.videoLinks.length}):
                  </h4>
                  <div className="space-y-2">
                    {latestData.videoLinks.map((videoLink, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-2 rounded border"
                      >
                        <a
                          href={videoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline text-sm break-all"
                        >
                          {videoLink}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Links Section */}
              {latestData?.blogLinks?.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Blog Links ({latestData.blogLinks.length}):
                  </h4>
                  <div className="space-y-2">
                    {latestData.blogLinks.map((blogLink, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-2 rounded border"
                      >
                        <a
                          href={blogLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline text-sm break-all"
                        >
                          {blogLink}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Show message if no links */}
              {!latestData?.videoLinks?.length &&
                !latestData?.blogLinks?.length && (
                  <p className="text-gray-500 text-sm">No links submitted.</p>
                )}
            </div>
          </div>
        </div>
      </section>
      <section className="ml-[22%] mb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Information from Trusted Sources
          </h3>
          <ul className="space-y-5">
            {/* 1. India–U.S. Trade Talks */}
            <li className="text-sm">
              <strong>
                India–U.S. Trade Talks: Visit of Trade Minister Piyush Goyal
              </strong>
              <ul className="pl-4 list-disc">
                <li>
                  India’s Trade Minister <strong>Piyush Goyal</strong> is set to
                  visit Washington, D.C. on <strong>22 September 2025</strong>{" "}
                  for trade talks with the U.S.
                </li>
                <li>
                  Key issues include U.S. tariffs on Indian goods, H-1B visa fee
                  increases, agricultural/dairy sector access, and India’s
                  Russian oil imports.
                </li>
              </ul>
            </li>

            {/* 2. Partial Solar Eclipse */}
            <li className="text-sm">
              <strong>Partial Solar Eclipse on 21 September 2025</strong>
              <ul className="pl-4 list-disc">
                <li>
                  A partial solar eclipse (Surya Grahan) is scheduled for{" "}
                  <strong>21 Sep 2025</strong>, lasting from ~10:59 PM IST to
                  3:23 AM IST on 22 Sep.
                </li>
                <li>
                  Not visible in India, as the Sun will be below the horizon
                  during the event.
                </li>
              </ul>
            </li>

            {/* 3. Shardiya Navratri */}
            <li className="text-sm">
              <strong>Shardiya Navratri 2025</strong>
              <ul className="pl-4 list-disc">
                <li>
                  The festival of <strong>Shardiya Navratri</strong> is
                  approaching, celebrated with devotion and cultural
                  festivities.
                </li>
                <li>
                  Ghatasthapana (start date) is expected around{" "}
                  <strong>22 or 23 September</strong>, depending on auspicious
                  timings.
                </li>
              </ul>
            </li>

            {/* 4. UPITS 2025 */}
            <li className="text-sm">
              <strong>
                UPITS 2025 – Russia–India Business Dialogue in Greater Noida
              </strong>
              <ul className="pl-4 list-disc">
                <li>
                  The{" "}
                  <strong>
                    Uttar Pradesh International Trade Show (UPITS 2025)
                  </strong>{" "}
                  will host a Russia–India Business Dialogue on{" "}
                  <strong>26 September</strong> in Greater Noida.
                </li>
                <li>
                  Focus areas include technology transfer, investment,
                  education, insurance, and banking.
                </li>
              </ul>
            </li>

            {/* 5. Public Health Concerns */}
            <li className="text-sm">
              <strong>Rising Risks & Public Health Concerns</strong>
              <ul className="pl-4 list-disc">
                <li>
                  A study warns climate change could expand habitats of venomous
                  snakes (“Big Four”), raising snakebite risk in northern and
                  northeastern India.
                </li>
                <li>
                  Floods in Himachal Pradesh, Jammu & Kashmir, and Pakistan have
                  displaced thousands and damaged infrastructure.
                </li>
              </ul>
            </li>

            {/* 6. Celestial Events */}
            <li className="text-sm">
              <strong>Celestial Events Captivating Public Interest</strong>
              <ul className="pl-4 list-disc">
                <li>
                  Earlier in September, India witnessed a{" "}
                  <strong>total lunar eclipse (Blood Moon)</strong>, widely
                  shared on social media.
                </li>
                <li>
                  The rare <strong>Chi Cygnids meteor shower</strong>, visible
                  once every five years, is delighting astronomy enthusiasts
                  this month.
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="mr-[7%] bg-white border rounded-lg p-6 font-semibold h-40">
          Reports of the input Information have been analyzed and matches with
          our Trusted Sources. Therefore it is{" "}
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            VERIFIED
          </span>{" "}
          News
        </div>
      </section>
    </>
  );
};

export default TrendAnalysis;
