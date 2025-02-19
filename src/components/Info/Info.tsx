import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetRepoInfoQuery } from "../../redux/githubApi";
import { setRepoInfo, clearRepoInfo } from "../../redux/repoInfoSlice";
import { selectRepoInfo } from "../../redux/selectors";
import { Spinner } from "react-bootstrap";

const Info = ({ repoUrl }: { repoUrl: string }) => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetRepoInfoQuery(repoUrl);
  const repoInfo = useSelector(selectRepoInfo);

  useEffect(() => {
    if (data) {
      dispatch(setRepoInfo(data));
    } else if (error) {
      dispatch(clearRepoInfo());
    }
  }, [data, error, dispatch]);

  if (isLoading) return <Spinner animation="border" />;
  if (error || !repoInfo.fullName)
    return <p className="text-danger">Failed to load repo info</p>;

  return (
    <div className="mb-3">
      <a href={repoInfo.htmlUrl} target="_blank" rel="noopener noreferrer">
        <strong>
          {repoInfo.owner} &gt; {repoInfo.fullName}
        </strong>
      </a>
      <span> ⭐ {repoInfo.stars.toLocaleString()} stars</span>
    </div>
  );
};

export default Info;
