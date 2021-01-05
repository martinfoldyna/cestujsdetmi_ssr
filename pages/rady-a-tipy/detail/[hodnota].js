import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  Section,
  SectionHeading,
  SectionContent,
} from "../../../layouts/Section";
import { connect } from "react-redux";
import {
  getAdvice,
  removeAdvice,
  getRelatedAdvices,
} from "../../../redux/actions/radyTipy";
import { useRouter } from "next/router";
import LoadingSkeleton from "../../../layouts/LoadingSkeleton";
import parse from "html-react-parser";
import { BsClock } from "react-icons/bs";
import Post from "../../../layouts/Post";
import { Row, Col } from "react-grid-system";

const MyComponent = ({
  radyTipy: { post, relatedPosts },
  getAdvice,
  history,
  removeAdvice,
  getRelatedAdvices,
}) => {
  const router = useRouter();

  const { hodnota } = router.query;

  const loadAdvice = () => {
    getAdvice(hodnota);
  };

  const [realtedLimit, setRealtedLimit] = useState(9);

  useEffect(() => {
    loadAdvice();
  }, []);

  useEffect(() => {
    return function cleanUp() {
      removeAdvice();
    };
  }, []);

  return post ? (
    <div>
      <Section className="border-section mt-0 post-detail">
        <SectionHeading background="none">
          <h2>{post.nazev}</h2>
          <div className="d-flex align-items-center date">
            <BsClock className="text-yellow btn-icon" />
            <span>
              {new Date(post.createdAt).toLocaleString("cs", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </SectionHeading>
        <SectionContent>
          {(post.obrazek || post.image_filename) && (
            <div className="post-detail-image-wrapper">
              <img
                className="post-detail-image w-100"
                src={
                  post.obrazek?.url
                    ? post.obrazek.url
                    : `http://www.cestujsdetmi.cz/${post.image_filename}`
                }
                alt={
                  post.obrazek?.alternativeText
                    ? post.obrazek?.alternativeText
                    : post.nazev
                }
              />
            </div>
          )}
          <div className="content-wrapper">{parse(post.text)}</div>
        </SectionContent>
      </Section>
      {post?.page_keywords && (
        <Section className="realted-advices border-section">
          <SectionHeading background="none">
            <h2>Související články</h2>
          </SectionHeading>
          <SectionContent>
            <Row>
              {relatedPosts ? (
                relatedPosts.map(
                  (post, index) =>
                    index < realtedLimit && (
                      <Fragment>
                        <Col md={4}>
                          <Post post={post} />
                        </Col>
                      </Fragment>
                    )
                )
              ) : (
                <LoadingSkeleton />
              )}
            </Row>
            {realtedLimit < relatedPosts?.length && (
              <div className="d-flex justify-content-center">
                <button
                  className="btn bg-yellow text-white"
                  onClick={() => setRealtedLimit((prevState) => prevState * 2)}
                >
                  Načíst další
                </button>
              </div>
            )}
          </SectionContent>
        </Section>
      )}
    </div>
  ) : (
    <LoadingSkeleton />
  );
};

MyComponent.propTypes = {
  radyTipy: PropTypes.object.isRequired,
  getAdvice: PropTypes.func.isRequired,
  removeAdvice: PropTypes.func.isRequired,
  getRelatedAdvices: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  radyTipy: state.radyTipy,
});

export default connect(mapStateToProps, {
  getAdvice,
  removeAdvice,
  getRelatedAdvices,
})(MyComponent);
